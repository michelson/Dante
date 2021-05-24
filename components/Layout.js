import Menu from './Menu'
export default function Layout({ children, name, mode, version, basePath, setMode }) {
  return (
    <div className={ `h-screen min-h-full ${mode == "light" ? '' : 'dark'}`}>
      <Menu 
        mode={mode} 
        name={name}
        version={version} 
        basePath={basePath}
        setMode={()=> setMode(mode == "light" ? 'dark' : 'light')}
      />
      <div className="bg-white dark:bg-black min-h-screen h-auto">
        {children}
      </div>
      <style jsx>{`/**/`}</style>
      <style jsx global>
      
        {`
        @import url("https://fonts.googleapis.com/css?family=Merriweather:400,700,800,400italic,700italic|Open+Sans:400,300,700,800");

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,800&display=swap');
        `}
      
      </style>
    </div>
  )
}
