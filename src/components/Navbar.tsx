import Link from 'next/link'
import {getServerSession} from 'next-auth'

async function Navbar() {

   const session = await getServerSession()


  return (
    <nav className='bg-zin-900 p-4'>
        <div className='flex justify-between container mx-auto'>
            <div className='flex flex-row'>
            <Link href='/'>
           <h1 className='font-bold text-xl '> Doctor Finder </h1>
           <img
              className="w-20 h-15 mr-2 mb-2 ml-5 "
              src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
              alt="logo"
            />
            </Link>
            </div>
            <ul className='flex gap-x-2'>
                {
                    session ? (
                        <li className='px-3 py-1'>
                    <Link href='/dashboard/profile'>Perfil</Link>
                </li>
                    ) : (
                        <>
                        <li className='px-3 py-1'>
                        <Link href='/login'>Login</Link>
                    </li>
                    <li className='px-3 py-1'>
                        <Link href='/register'>Registrar</Link>
                    </li>
                    <li className='px-3 py-1'>
                        <Link href='/about'>Sobre nosotros</Link>
                    </li>
                    </>
                    )
                }
               
            </ul>
        </div>
    </nav>
  )
}

export default Navbar