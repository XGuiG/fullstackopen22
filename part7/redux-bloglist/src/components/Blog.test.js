import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog by default", () => {
  const blog = {
    title: "Blog component testing by default",
    author: "xiaogui",
    url: "test",
    likes: 0,
  };

  render(<Blog blog={blog} />);
  
  // const element = screen.getByText('Blog component testing by default')
  // expect(element).toBeDefined()

  expect(
    screen.getByText((content, element) => {
      return (
        content.includes("Blog component testing by default" && "xiaogui") &&
        element.tagName.toLowerCase() === "div"
      );
    })
  ).toBeInTheDocument();

  // const {container} = render(<Blog blog={blog} />)

  // const div = container.querySelector('.BlogDefault')
  // expect(div).toHaveTextContent('Blog component testing by default')
});

test("clicking the button calls event handler once", () => {
  const blog = {
    title: "Blog component testing when click",
    author: "xiaogui",
    url: "test",
    user: {
      username: "bigjun",
      name: "small gui",
      id: "640c35081672d275b8941e79",
    },
    likes: 0,
  };

  const user = {
    username: "bigjun",
    name: "small gui",
    id: "640c35081672d275b8941e79",
  };

  // const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} user={user} />);

  // const user = userEvent.setup()
  // const button = screen.getByText('view')

  const button = container.querySelector(".click");
  fireEvent.click(button);
  

  expect(
    screen.getByText((content, element) => {
      return (
        content.includes("like") && element.tagName.toLowerCase() === "button"
      );
    })
  ).toBeInTheDocument();

  expect(button).toHaveTextContent("hide");
});

test("received two calls if like button id clicked twice", async () => {
  const blog = {
    title: "Blog component testing when click like twice",
    author: "xiaogui",
    url: "test",
    likes: 0,
  };

  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} updateLike={mockHandler} />);

  const buttonview = container.querySelector(".click");
  fireEvent.click(buttonview);
  
  const user = userEvent.setup()
  const buttonlike = screen.getByText('like')
  
  await user.click(buttonlike)
  await user.click(buttonlike)
  
//   const element = screen.getByText('2')
  expect(mockHandler.mock.calls).toHaveLength(2)
//   expect(element).toBeDefined()

});
