import  { ReactComponent as Logo }  from '../logo.svg'

export default function Header() {
  return(
    <div className="bg-transparent w-full mb-4" >
      <Logo style={{width:'150px', height:'auto'}}/>
    </div>
  )
}
