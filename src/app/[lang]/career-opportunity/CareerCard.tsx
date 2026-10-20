import CareerModal from "./CareerModal"

type Props = {
    job_title: string
    apply_to: string
    link: string
    division: string
    location: string
    description: string
  }
  
  export default function CareerCard({
    job_title,
    apply_to,
    link,
    division,
    location,
    description,
  }: Props) {
    
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6">
          <h4 className="text-lg font-semibold uppercase line-clamp-2">{job_title} - {location}</h4>
    
          <br />
          
          <CareerModal buttonText={"Apply Now"} apply_to={apply_to} link={link} title={job_title} division={division} location={location} description={description}/>
        </div>
      </div>
    )
  }