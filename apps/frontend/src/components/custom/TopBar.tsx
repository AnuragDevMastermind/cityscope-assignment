
import ic_company from "../../assets/ic_company.svg";

function TopBar() {
  return (
    <div className="h-14 border-b flex items-center ps-5">
      <div className="flex gap-4">
        <img className="size-7" src={ic_company} alt="" />
        <p className="text-primary font-bold">CityScope</p>
      </div>
    </div>
  )
}

export default TopBar