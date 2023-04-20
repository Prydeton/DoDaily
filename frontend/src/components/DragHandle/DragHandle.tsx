import { GripVertical } from 'lucide-react'

import { Wrapper } from './DragHandle.styles'

interface DragHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const DragHandle: React.FC<DragHandleProps> = ({ active, ...props }) => <Wrapper
  title={!active ? 'Drag to reorder' : ''}
  data-active={active}
  {...props}
><GripVertical /></Wrapper>

export default DragHandle
