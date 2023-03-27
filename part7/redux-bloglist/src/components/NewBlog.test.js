import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from "./NewBlog";
import userEvent from '@testing-library/user-event'

test('<NewBlog /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<NewBlog createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write here blog title')
    const inputAuthor = screen.getByPlaceholderText('write here blog author')
    const inputUrl = screen.getByPlaceholderText('write here blog url')

    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'testing a from...')
    await user.type(inputAuthor, 'testing a from...')
    await user.type(inputUrl, 'testing a from...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    // expect(createBlog.mock.calls[0][0].newTitle).toBe('testing a form...')
})