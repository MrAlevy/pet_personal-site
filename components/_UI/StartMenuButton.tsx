export default function StartMenuButton({
  active,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { active?: boolean }) {
  return (
    <button
      className={`
        h-full bg-gray-200 bg-opacity-0 cursor-default border-b-2 border-gray-400
        transform scale-x-90 
        transition duration-75 ease-in-out
        hover:scale-x-105 hover:bg-opacity-10
        active:bg-opacity-5
        ${
          active &&
          `
        scale-x-105 bg-opacity-10
        hover:bg-opacity-20
        active:bg-opacity-0
        `
        }
      `}
      {...props}
      style={{
        width: '40px',
        ...props.style,
      }}
    />
  )
}
