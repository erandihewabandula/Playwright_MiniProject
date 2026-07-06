import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

 /* await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('1');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('2');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('3');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('4');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('5');
  await page.getByTestId('text-input').press('Enter'); */

  //const NewToDo = await page.getByTestId('todo-list').allTextContents();
  const NewToDo = page.getByTestId('todo-list')

await NewToDo.fill('Buy Milk');
await NewToDo.press('Enter');

await NewToDo.fill('Buy Eggs');
await NewToDo.press('Enter');

await NewToDo.fill('Buy Bread');
await NewToDo.press('Enter');

await NewToDo.fill('Pay Bill');
await NewToDo.press('Enter');

await NewToDo.fill('Cook Breakfast');
await NewToDo.press('Enter');

await page.getByRole('link', { name: 'Active' }).click();
await page.getByRole('link', { name: 'Completed' }).click();
await page.getByRole('link', { name: 'All' }).click();


  //asserting that the footer navigation contains the correct text
  await expect(page.getByTestId('footer-navigation')).toContainText('AllActiveCompleted');

    //asserting that the footer-navigation cshows the correct number of total tasks
  await expect(page.getByTestId('footer-navigation')).toContainText('5');           
    //asserting that the header contains the correct text
    //=> await expect(page.getByTestId('header').getByRole('heading')).toContainText('todos');

  //toggling the completed tasks by checking the checkboxes for tasks 2 and 3
  await page.getByRole('listitem').filter({ hasText: 'Buy Eggs' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('listitem').filter({ hasText: 'Buy Bread' }).getByTestId('todo-item-toggle').check();

//asserting that the header contains the correct text
  await page.getByRole('link', { name: 'Active' }).click(); //1,4,5
  await page.getByRole('link', { name: 'Completed' }).click(); //2,3
  await page.getByRole('button', { name: 'Clear completed' }).click(); 
  await page.getByRole('link', { name: 'All' }).click(); //1,4,5



  //asserting that the footer navigation contains the correct text after clearing completed tasks
  await expect(page.getByTestId('footer-navigation')).toContainText('AllActiveCompleted');

  //asserting that the header contains the correct text after clearing completed tasks
  await expect(page.getByTestId('header').getByRole('heading')).toContainText('todos');

  //Item toBeVisible
  await expect(page.getByText('Buy Milk')).toBeVisible();
  await page.getByText('Pay Bill').click();
  
  //Item toBeVisible
  await expect(page.getByText('Pay Bill')).toBeVisible();
  await expect(page.getByText('Cook Breakfast')).toBeVisible();
});