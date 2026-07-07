import { test, expect } from '@playwright/test';

test('todo_app @sanity', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('Buy Grocery');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Go for walk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Rest');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Play');
  await page.getByTestId('text-input').press('Enter');

  //Verify all tasks in the todo List
  await page.getByRole('link', { name: 'All' }).click();

  //Display all Tasks in the console
  const AllTasks = await page.getByTestId('todo-list').getByRole('listitem').allTextContents();
  console.log('All Tasks:', AllTasks);

  //Mark "Buy Grocery" & "Rest" tasks as completed
  await page.getByRole('listitem').filter({ hasText: 'Buy Grocery' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('listitem').filter({ hasText: 'Rest' }).getByTestId('todo-item-toggle').check();
  

      //adding assertion to verify that the number of completed tasks is correct
      await page.getByRole('link', { name: 'Completed' }).click();
      //await page.getByRole('link', { name: 'Completed' }).count();
      //console.log(await page.getByRole('link', { name: 'Completed' }).count());
      const completedCount1 = await page.getByTestId('todo-list').getByRole('listitem').count();
      console.log('Completed tasks:', completedCount1);
      expect(completedCount1).toBe(2);

      /*
  const completedTasks = await page.getByRole('listitem').filter({ hasText: 'Buy Grocery' }).count() +
    await page.getByRole('listitem').filter({ hasText: 'Rest' }).count();
  expect(completedTasks).toBe(1);
  */



  //Verify 'to-do' tasks display in each tab
  await page.getByRole('link', { name: 'Active' }).click();
  //Verifying that the 'Play' task label is visible
  await expect(page.getByText('Play')).toBeVisible();
  //Verify that the "Go for walk" label shows the correctly
  await expect(page.getByTestId('todo-list')).toContainText('Go for walk');


  

  //Clicking on the "Clear completed" button to remove completed tasks and 
  // check "All" tab to verify that the completed tasks are removed
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  //console.log(await page.getByRole('link', { name: 'Completed' }).count());
  const completedCount = await page.getByTestId('todo-list').getByRole('listitem').count();
  console.log('Completed tasks remaining:', completedCount);
  expect(completedCount).toBe(0);
 

  await page.getByRole('link', { name: 'All' }).click();




  //console.log (await page.getByRole('listitem').filter({ hasText: 'Buy Grocery' }).count());
});