import Image from 'next/image'
import Link from 'next/link'
import Selector from './Selector'
import Switch from './Switch'

export default function Menu ({mode, version, basePath, setMode}) {

	const path = basePath ? basePath : '/'
	return (
		<nav className={`bg-white shadow dark:bg-black ${mode || ''}` }>
			<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex justify-between h-16 dark:text-gray-200 dark:bg-black">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500" aria-controls="mobile-menu" aria-expanded="false">
							<span className="sr-only">Open main menu</span>

							<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>

							<svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex-shrink-0 flex items-center">

							<div className="dark:bg-white p-2 rounded-sm flex ">
								<Link href={`/`} >
									<a className="cursor-pointer">
										<Image
											className="block lg:hidden h-8 w-auto"
											src="/images/site/dante-editor-logo.png"
											alt="Dante Editor"
											width={21}
											height={21}
											className="hidden lg:block h-8 w-auto"
										/>
									</a>
								</Link>
							</div>
						</div>

						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link href={`${path}`}>
								<a className="border-green-500 text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
									Dante Editor v{version}
								</a>
							</Link>
							<Link href={`${path}posts/index`}>
								<a className="border-transparent text-gray-900 dark:text-gray-200 hover:border-gray-700 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
									Docs
								</a>
							</Link>
							<Link href={`${path}license`}>
								<a className="border-transparent text-gray-900 dark:text-gray-200 hover:border-gray-700 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
									license
								</a>
							</Link>

						</div>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

						<div className="ml-3 relative dark:text-gray-200">
							<div className="flex flex-row-reverse items-center space-x-3">
								<button type="button" 
									className="ml-10 bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" 
									id="user-menu" 
									aria-expanded="false" 
									aria-haspopup="true">
									
									<span className="sr-only">Open user menu</span>
									<Image
										className="block lg:hidden h-8 w-auto"
										src="/images/site/github-logo.png"
										alt="Picture of the author"
										width={31}
										height={31}
										className="hidden lg:block h-8 w-auto dark:bg-black"
									/>
								</button>
							
								<Selector/>
								<div className="flex items-center">
									<Switch mode={mode} setMode={setMode}/>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}