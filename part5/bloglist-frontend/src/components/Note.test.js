import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test.skip('renders content', () => {
  const blog = {
    title: 'agdawefwfw',
    author: 'fafsaa',
    url: 'qewqw'
  }

  const user = {
    name: 'as'
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('agdawefwfw')
  const element2 = screen.getByText('qewqw')

//   screen.debug()
//   sreen.debug(element)
//   expect(element).toBeDefined()
//   expect(element2).not.toBeVisible()
})

test.skip('Clicking View shows the full content of the blog', async () => {
  const blog = {
    title: 'fred',
    author: 'andy',
    likes: 42,
    url: 'feed'
  }

  const userLogin = {
    name: 'as'
  }

  render(
    <Blog blog={blog} user={userLogin} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const url = screen.getByText(blog.url)
  const likes = screen.getByText(blog.likes)

  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})

test.skip('Clicking Like twice registers event two times', async () => {
  const blog = {
    title: 'fred',
    author: 'andy',
    likes: 42,
    url: 'feed'
  }

  const userLogin = {
    name: 'as'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={userLogin} incrementLikes={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(1)
})

test()
