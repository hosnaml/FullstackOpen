import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('update parent state and calls onSubmit', async () => {
    const onCreate = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm onCreate={onCreate} />)

    const titleInput = screen.getAllByRole('textbox')[0] // First textbox is title
    const sendButton = screen.getByRole('button', { name: 'create' })

    await user.type(titleInput, 'testing a form...')
    await user.click(sendButton)

    expect(onCreate.mock.calls).toHaveLength(1)
    expect(onCreate.mock.calls[0][0].title).toBe('testing a form...')

  })

  test('form calls event handler with right details when new blog is created', async () => {
    const onCreate = vi.fn().mockReturnValue(true) // Make it return true to trigger form reset
    const user = userEvent.setup()

    render(<BlogForm onCreate={onCreate} />)

    // Get all the input fields
    const titleInput = screen.getAllByRole('textbox')[0] // First textbox is title
    const authorInput = screen.getAllByRole('textbox')[1] // Second textbox is author
    const urlInput = screen.getAllByRole('textbox')[2] // Third textbox is url
    const createButton = screen.getByRole('button', { name: 'create' })

    // Fill in all the form fields
    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://testblog.com')

    // Submit the form
    await user.click(createButton)

    // Verify the event handler was called once
    expect(onCreate).toHaveBeenCalledTimes(1)

    // Verify it was called with the correct blog object
    expect(onCreate).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://testblog.com'
    })

    // Verify that the form fields are cleared after successful submission
    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
  })

})