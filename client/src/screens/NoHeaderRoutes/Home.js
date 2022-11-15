import React from "react"
import { 
  AboutUs,
  CompanyProfile,
  Intro,
} from "../../components"

const Home = () => {
  
  return (
    <>
        <section className="spacing-xl">
          <Intro />
        </section>

        <section className="spacing-xl">
          <CompanyProfile />
        </section>

        <section className="spacing-xl">
          <AboutUs />
        </section>
    </>
  )
}

export default Home
