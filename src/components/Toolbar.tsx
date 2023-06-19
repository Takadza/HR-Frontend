import MenuIcon from '@mui/icons-material/Menu';

export function Toolbar () {
  return (
    <div className="flex flex-row gap-6 items-center shadow-md p-6 bg-white">
      <MenuIcon />
      <span className="text-lg font-semibold">HR Administration System</span>
    </div>
  )
}