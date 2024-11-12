import { formatText } from '@/lib/utils';
import { InstructionsListPropType } from '@/types/ComponentPropTypes'
import { ChefHat } from 'lucide-react';
const InstructionsList = ({ instructions }: InstructionsListPropType) => {
    const formattedInstructions = formatText(instructions);

    return (
        <>
            <div className="flex flex-row flex-wrap gap-3 pt-10">
                <ChefHat color="#2f3230" />
                <p className="text-gray-700 text-lg pb-4"><strong>Instructions: </strong></p>
            </div>
            <div className='pl-10  pb-10'>
                {formattedInstructions &&
                    <div dangerouslySetInnerHTML={{ __html: formattedInstructions }} />
                }
            </div>
        </>
    )
}

export default InstructionsList