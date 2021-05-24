/* This example requires Tailwind CSS v2.0+ */
import Image from 'next/image'
import Link from 'next/link'
import Selector from './Selector'
import Switch from './Switch'
import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({mode, version, basePath, setMode}) {

	const path = basePath ? basePath : '/'

	const navigation = [
		{ name: `Dante Editor v${version}`, href: `${path}`, current: true },
		{ name: 'Docs', href: `${path}posts/index`, current: false },
		//{ name: 'License', href: `${path}license`, current: false },
	]

  return (
    <Disclosure as="nav" className={`bg-white shadow dark:bg-black ${mode || ''}`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">

									<div className="dark:bg-white p-2 rounded-sm flex ">
										<Link href={`/`} >
											<a className="cursor-pointer flex">
												<Image
													className="block lg:hidden h-8 w-auto"
													src="/images/site/dante-editor-logo.png"
													alt="Dante Editor"
													width={21}
													height={21}
												/>
											</a>
										</Link>
									</div>

                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
											<Link href={item.href}>
												<a className={
													`${item.current ? 'border-green-500' : '' } text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 pb-1 border-b-2 text-sm font-medium`
												}>
													{item.name}
												</a>
											</Link>
                    ))}

										<Selector/>

										{/*<a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
												</a>*/}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/*<button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
											</button>*/}

								<div className="flex items-center mr-2">
									<Switch mode={mode} setMode={setMode}/>
								</div>
								<a href="http://github.com/michelson/dante" target="blank">
									<Image
											className="block lg:hidden h-8 w-auto"
											src="/images/site/github-logo.png"
											alt="Picture of the author"
											width={31}
											height={31}
											className="hidden lg:block h-8 w-auto dark:bg-black"
										/>								
								</a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
