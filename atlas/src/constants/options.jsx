// Import relevant icons
import { UserIcon, UsersIcon } from 'lucide-react'
import { FaUsers, FaUserFriends, FaMoneyBillWave, FaGem, FaCrown } from 'react-icons/fa'
import { MdTrendingFlat } from 'react-icons/md'

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: <img src="/create-trip-icons/solo.png" alt="solo" />,
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: <img src="/create-trip-icons/couple.png" alt="couple" />,
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: <img src="/create-trip-icons/family.png" alt="family" />,
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: <img src="/create-trip-icons/friends.png" alt="friends" />,
        people: 'Up to 10 People'
    },
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: <img src="/create-trip-icons/low-price.png" alt="cheap" />,
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep costs on the average side',
        icon: <img src="/create-trip-icons/mod-price.png" alt="moderate" />,
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: <img src="/create-trip-icons/high-price.png" alt="luxury" />,
    },
]

export const AI_PROMPT = 'Generate Travel plan for Location: {location}'
