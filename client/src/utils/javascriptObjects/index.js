import { missionTarget, coreValuesIcon, visionIcon } from "../../assets"


export const aboutSectionArray = [
    {
        _id: 1,
        title: "Our Mission",
        description: "To create an enabling digital environment where seamless and swift remittance is assured.",
        icon: missionTarget,
    },
    {
        _id: 2,
        title: "Our Vision",
        description: "To be the leading, most preferred and reliable exchange trading entity in Nigeria.",
        icon: visionIcon,
    },
    {
        _id: 3,
        title: "Our Core Values",
        description: "Impex Fund values her customers and in a bid to give the best of experience, we are focused and not limited on;",
        icon: coreValuesIcon,
        list : <>
            <li>Customer Support</li>
            <li>Best Rates</li>
            <li>Loyalty</li>
            <li>Swift remittance</li>
            <li>Openness</li>
        </>
    },
]