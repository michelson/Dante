import Menu from './Menu'
export default function Layout({ children }) {
  return (
    <>
      <Menu/>
      <div className="bg-white">
        {children}
      </div>
      <style jsx>{`/**/`}</style>
      <style jsx global>{`/**/`}</style>
    </>
  )
}
