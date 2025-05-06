import { FaCloud, FaStar, FaHeart, FaTree, FaWater } from 'react-icons/fa';
import { GiMeditation, GiSunrise, GiNightSleep } from 'react-icons/gi';
import { RiMentalHealthFill } from 'react-icons/ri';

const iconMap = {
    FaCloud,
    FaStar,
    FaHeart,
    FaTree,
    FaWater,
    GiMeditation,
    GiSunrise,
    GiNightSleep,
    RiMentalHealthFill
};

export function MeditationIcon({ name, className }) {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent className={className} /> : null;
}