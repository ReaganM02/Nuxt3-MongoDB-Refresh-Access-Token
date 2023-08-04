import { defineFormKitConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

const input = 'outline outline-1 outline-zinc-200 bg-zinc-100 w-full rounded h-[40px] pl-4 text-zinc-600 text-sm focus:outline-slate-400 formkit-errors:outline-rose-500 formkit-invalid:outline-rose-500'
export default defineFormKitConfig({
    config: {
        classes: generateClasses({
            global: {
                message: 'text-red-500 text-xs mt-2',
                inner: 'max-w-none',
                wrapper: '!max-w-none',
                label: 'font-inter text-zinc-600',
                help: 'text-xs text-zinc-400 mt-2'
            },
            text: {
                input
            },
            password: {
                input
            },
            email: {
                input
            },
            number: {
                input
            },
            submit: {
                input: 'w-full bg-blue-600 text-white min-h-[45px] rounded uppercase font-bold font-inter leading-0 duration-200 hover:bg-blue-700 relative overflow-hidden',
                outer: 'mt-4'
            }
        })
    }
})
