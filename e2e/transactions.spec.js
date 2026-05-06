import { test, expect } from '@playwright/test';
import { TransactionForm } from './pages/transaction-form.js';
import { seedTransactions } from '../src/seed.js';
import { computeBalance, formatAmount } from '../src/calculator.js';
import fs from 'fs/promises';

test('ajouter une transaction avec tous les champs', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FinTrack/);

  const form = new TransactionForm(page);
  await form.open();
  await form.fill({ label: 'Café', amount: 3.5, category: 'alimentation', type: 'debit' });
  await form.submit();

  const transactionRow = page.locator('.tx').first();
  await expect(transactionRow.getByText('Café')).toBeVisible();
  await expect(transactionRow.getByText(/3\.50/)).toBeVisible();
  await expect(transactionRow.getByText('alimentation')).toBeVisible();
});

test('export CSV déclenche un téléchargement', async ({ page }) => {
  await page.goto('/');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Télécharger le CSV' }).click(),
  ]);

  expect(await download.suggestedFilename()).toBe('fintrack-transactions.csv');
  const path = await download.path();
  const stat = await fs.stat(path);
  expect(stat.size).toBeGreaterThan(10);
});

test('la liste initiale contient les transactions de seed et le solde correspond', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByText('Salaire')).toBeVisible();

  const expected = formatAmount(computeBalance(seedTransactions), 'EUR');
  const balanceText = await page.locator('.card-balance .card-value').innerText();
  expect(balanceText).toBe(expected);
});
