import Image from 'next/image';
import hero1 from '../assets/images/hero1.jpg';

const Hero = () => {
    return (
        <div className='flex flex-col items-center h-screen'>
            <div className="relative w-5/6 h-[400px] mx-auto">
                <Image
                    src={hero1}
                    alt="Hero Image"
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-3xl"
                />
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-white text-4xl font-bold">Welcome to Our Website!</h1>
                </div>
            </div>
            <div className='relative w-[800px] h-[130px] bg-gray-100 rounded-xl -mt-[60px] z-20'>
                
            </div>
        </div>
    )
};

export default Hero;
