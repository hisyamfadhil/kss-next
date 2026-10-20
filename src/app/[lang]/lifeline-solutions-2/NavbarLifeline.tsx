import { baseUrl } from "@/utils/baseUrl";
import Link from "next/link";

const NavbarLifeline = async ({lang}:{lang:string}) => {
    return (
        <div className="bg-gray-100" style={{ display: "block" }}>
        <div className="container mx-auto lg:px-4 hidden md:flex justify-end sticky">
          <div className="ps-top__right">
            <ul className="menu-top">
              <li className="nav-item"><Link className="nav-link" href={baseUrl("/lifeline-solutions/solution", lang)}>Solution</Link></li>
              <li className="nav-item"><Link className="nav-link" href={baseUrl("/lifeline-solutions/services", lang)}>Service</Link></li>
              <li className="nav-item"><Link className="nav-link" href={baseUrl("/lifeline-solutions/cases", lang)}>Cases</Link></li>
              <li className="nav-item"><Link className="nav-link" href={baseUrl("/lifeline-solutions/fall-protection", lang)}>Fall Protection</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
}
export default NavbarLifeline;