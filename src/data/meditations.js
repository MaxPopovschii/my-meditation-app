import { FaCloud, FaStar, FaHeart, FaTree, FaWater } from 'react-icons/fa';
import { GiMeditation, GiSunrise, GiNightSleep } from 'react-icons/gi';
import { RiMentalHealthFill } from 'react-icons/ri';

export const meditations = [
    { 
        title: 'Respirazione Consapevole', 
        duration: 10,  // Changed to number
        theme: 'Rilassamento',
        description: 'Concentrati sul tuo respiro per trovare la calma interiore',
        gradient: 'from-blue-500 to-cyan-500',
        iconName: 'FaCloud',
        audioSrc: '/meditations/breathing.mp3'
    },
    { 
        title: 'Meditazione Profonda', 
        duration: 15,
        theme: 'Focus',
        description: 'Raggiungi uno stato di profonda concentrazione mentale',
        gradient: 'from-purple-500 to-indigo-500',
        iconName: 'GiMeditation',
        audioSrc: '/meditations/deep-meditation.mp3'
    },
    { 
        title: 'Sonno Ristoratore', 
        duration: 20,
        theme: 'Sonno',
        description: 'Preparati per un sonno profondo e rigenerante',
        gradient: 'from-indigo-500 to-purple-600',
        iconName: 'GiNightSleep',
        audioSrc: '/meditations/sleep.mp3'
    },
    { 
        title: 'Risveglio Energetico', 
        duration: 8,
        theme: 'Energia',
        description: 'Inizia la giornata con vitalità e presenza mentale',
        gradient: 'from-amber-500 to-orange-500',
        iconName: 'GiSunrise',
        audioSrc: '/meditations/morning.mp3'
    },
    { 
        title: 'Serenità Naturale', 
        duration: 12,
        theme: 'Natura',
        description: 'Immergiti nei suoni e nelle sensazioni della natura',
        gradient: 'from-green-500 to-emerald-600',
        iconName: 'FaTree',
        audioSrc: '/meditations/nature.mp3'
    },
    { 
        title: 'Onde di Calma', 
        duration: 15,
        theme: 'Acqua',
        description: 'Lasciati cullare dal ritmo delle onde',
        gradient: 'from-blue-400 to-cyan-600',
        iconName: 'FaWater',
        audioSrc: '/meditations/waves.mp3'
    },
    { 
        title: 'Gestione dello Stress', 
        duration: 10,
        theme: 'Benessere',
        description: 'Tecniche efficaci per ridurre ansia e tensioni',
        gradient: 'from-rose-500 to-pink-500',
        iconName: 'RiMentalHealthFill',
        audioSrc: '/meditations/stress-relief.mp3'
    },
    { 
        title: 'Meditazione del Cuore', 
        duration: 12,
        theme: 'Amore',
        description: 'Sviluppa compassione e gentilezza verso te stesso e gli altri',
        gradient: 'from-red-500 to-rose-500',
        iconName: 'FaHeart',
        audioSrc: '/meditations/loving-kindness.mp3'
    },
    { 
        title: 'Viaggio Stellare', 
        duration: 15,
        theme: 'Spazio',
        description: 'Esplora gli spazi infiniti della tua coscienza',
        gradient: 'from-violet-500 to-purple-600',
        iconName: 'FaStar',
        audioSrc: '/meditations/space.mp3'
    }
];