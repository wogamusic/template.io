'use client'

import Image from 'next/image'
import { useModal } from '@/components/context/modalContext'
import { useMutations, useSelectedItem } from '../context'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi2'
import { useLayoutEffect } from 'react'

export const PolyHelpModal = () => {
  const { polyHelpProps, setPolyHelpProps } = useModal()
  const { updateSettings } = useSelectedItem()
  const { selectedItem } = useMutations()

  useLayoutEffect(() => {
    void setPolyHelpProps(() => ({
      name: selectedItem?.name ?? '',
      id: selectedItem?.id ?? 'T_0'
    }))
  }, [selectedItem, setPolyHelpProps])

  const track_id_number = parseInt(polyHelpProps.id.split('_')[1] ?? '0')

  const redBoxNumber = Math.floor(track_id_number / 128)
  const blueBoxNumber = track_id_number % 128

  return (
    <div className='w-full'>
      <div className='relative mx-auto mb-4 w-[846px] text-2xl'>
        <h2 className='font-codeBold mb-4'>Cubase Transformer Setup</h2>
        <h2>
          Track Name:{' '}
          <span className='underline underline-offset-8'>
            {polyHelpProps.name}
          </span>
        </h2>
        <h2>
          Track Id:{' '}
          <span className='underline underline-offset-8'>
            {polyHelpProps.id}
          </span>
        </h2>
        <div className='space-2 absolute top-2 right-2 flex flex-col'>
          <button
            type='button'
            className='bg-main hover:bg-main/80 cursor-pointer rounded-sm border px-2 py-1'
            onClick={() => {
              void updateSettings({
                key: 'selected_item_id',
                value: `T_${track_id_number - 1}`
              })
            }}>
            <HiChevronUp size={24} />
          </button>
          <button
            type='button'
            className='bg-main hover:bg-main/80 mt-2 cursor-pointer rounded-sm border px-2 py-1'
            onClick={() => {
              void updateSettings({
                key: 'selected_item_id',
                value: `T_${track_id_number + 1}`
              })
            }}>
            <HiChevronDown size={24} />
          </button>
        </div>
      </div>

      <div className='mx-auto mb-4 w-[846px] text-xs'>
        <p className='mb-2 flex items-center justify-start gap-2'>
          <span className='font-codeBold min-w-[85px] border-4 border-green-500 bg-white px-1 text-center text-black'>
            Track Name
          </span>{' '}
          should read{' '}
          <span className='font-codeBold border-4 border-green-500 bg-white px-1 text-black'>
            {polyHelpProps.name}
          </span>{' '}
          (not editable in the Transformer).
        </p>
        <p className='mb-2 flex items-center justify-start gap-2'>
          <span className='font-codeBold min-w-[85px] border-4 border-red-500 bg-white px-1 text-center text-black'>
            Subtype
          </span>{' '}
          should read{' '}
          <span className='font-codeBold min-w-[37px] border-4 border-red-500 bg-white px-1 text-center text-black'>
            {redBoxNumber}
          </span>{' '}
          which is the number portion of the Track Id divided by 128 and rounded
          down.
        </p>
        <p className='mb-2 flex items-center justify-start gap-2'>
          <span className='font-codeBold min-w-[85px] border-4 border-blue-500 bg-white px-1 text-center text-black'>
            Main Value
          </span>{' '}
          should read{' '}
          <span className='font-codeBold min-w-[37px] border-4 border-blue-500 bg-white px-1 text-center text-black'>
            {blueBoxNumber}
          </span>{' '}
          which is the number portion of the Track Id modulo 128.
        </p>
      </div>

      <div className='text-main relative m-auto h-[522px] w-[846px] overflow-hidden rounded-lg'>
        <Image
          src='cubase-15-transformer.png'
          alt='Cubase 15 Transformer'
          fill
          //width={1128} // 1128 actual image size
          //height={696} // 696 actual image size
          className='object-contain'
        />
        <div className='absolute top-0 left-0 flex items-center'>
          <div className='font-codeBold mt-[3px] ml-[2px] flex min-w-[69px] items-center justify-center border-4 border-green-500 bg-white px-1 text-xs text-black'>
            {polyHelpProps.name}
          </div>
          <Image
            src='cubase-15-transformer-send-text.png'
            alt='Cubase 15 Transformer'
            //fill
            width={107} // 141 actual image size
            height={28} // 37 actual image size
            className=''
          />
        </div>
        <div className='font-codeBold absolute bottom-[130px] left-[433px] flex min-w-[54px] items-center justify-center border-4 border-red-500 bg-white px-1 text-black'>
          {redBoxNumber}
        </div>
        <div className='font-codeBold absolute bottom-[98px] left-[433px] flex min-w-[54px] items-center justify-center border-4 border-blue-500 bg-white px-1 text-black'>
          {blueBoxNumber}
        </div>
      </div>
    </div>
  )
}
