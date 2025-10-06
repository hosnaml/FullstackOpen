import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

describe ('<Blog />', () => {
    test(`renders content`, () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            url: 'https://reactjs.org/docs/testing.html',
            likes: 5,
            user: {
                name: 'Hosna Molavi'
            }
        }
        render(<Blog blog={blog} />)

        const element = screen.getByText('Component testing is done with react-testing-library', {exact: false})
        
        expect(element).toBeDefined()

    })

    test('clicking the like button calls blogService.update', async () => {
        const blog = {
            id: 1,
            title: 'Component testing is done with react-testing-library',
            url: 'https://reactjs.org/docs/testing.html',
            likes: 5,
            user: {
                name: 'Hosna Molavi'
            }
        }
    
        const mockSetBlogs = vi.fn()
        const mockUpdate = vi.fn()
        vi.spyOn(blogService, 'update').mockImplementation(mockUpdate)

        render(
            <Blog blog={blog} setBlogs={mockSetBlogs} />
        )

        const user = userEvent.setup()
        
        // First click the view button to show the blog details
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        
        // Now find and click the like button
        const likeButton = screen.getByRole('button', { name: 'like' })
        await user.click(likeButton)

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith(1, { likes: 6 })

        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockUpdate).toHaveBeenCalledTimes(3)
    })

    test('renders title but not author, URL, or likes by default', () => {
        const blog = {
            id: 1,
            title: 'Testing React components',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10,
            user: {
                name: 'Test User'
            }
        }

        render(<Blog blog={blog} />)

        // Check that the title is visible
        expect(screen.getByText('Testing React components')).toBeDefined()

        // Check that author, URL, and likes are not visible (they should not be in the document when hidden)
        const blogDetails = document.querySelector('.blog-details')
        expect(blogDetails.style.display).toBe('none')
    })

    test('shows URL and likes when view button is clicked', async () => {
        const blog = {
            id: 1,
            title: 'Testing React components',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10,
            user: {
                name: 'Test User'
            }
        }

        const mockSetBlogs = vi.fn()
        render(<Blog blog={blog} setBlogs={mockSetBlogs} />)

        const user = userEvent.setup()

        // Initially, URL and likes should not be visible
        const blogDetails = document.querySelector('.blog-details')
        expect(blogDetails.style.display).toBe('none')

        // Click the view button
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        // Now URL, likes, and author should be visible
        expect(blogDetails.style.display).toBe('')
        expect(screen.getByText('https://example.com')).toBeDefined()
        expect(screen.getByText('likes 10', { exact: false })).toBeDefined()
        expect(screen.getByText('John Doe')).toBeDefined()
    })

    test('calls the remove handler when the remove button is clicked', async () => {
        const blog = {
            id: 1,
            title: 'Testing React components',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10,
            user: {
                name: 'Test User'
            }
        }

        const mockSetBlogs = vi.fn()
        const mockRemove = vi.fn().mockReturnValue(true)
        vi.spyOn(blogService, 'remove').mockImplementation(mockRemove)
        
        // Mock window.confirm to return true (user confirms deletion)
        vi.spyOn(window, 'confirm').mockReturnValue(true)

        render(<Blog blog={blog} setBlogs={mockSetBlogs} />)

        const user = userEvent.setup()

        // Click the view button to show the remove button
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        // Click the remove button
        const removeButton = screen.getByText('remove')
        await user.click(removeButton)

        expect(mockRemove).toHaveBeenCalledTimes(1)
        expect(mockRemove).toHaveBeenCalledWith(blog.id)
    })

    test('hides blog details when hide button is clicked', async () => {
        const blog = {
            id: 1,
            title: 'Testing React components',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10,
            user: {
                name: 'Test User'
            }
        }

        const mockSetBlogs = vi.fn()
        render(<Blog blog={blog} setBlogs={mockSetBlogs} />)

        const user = userEvent.setup()

        // Click the view button to show the blog details
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        // Ensure blog details are visible
        const blogDetails = document.querySelector('.blog-details')
        expect(blogDetails.style.display).toBe('')

        // Click the hide button to hide the blog details
        await user.click(screen.getByText('hide'))

        // Ensure blog details are hidden again
        expect(blogDetails.style.display).toBe('none')

    })
})