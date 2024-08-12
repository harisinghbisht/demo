import {
  IconPoint,
  IconUserCircle,
  IconAperture,
  IconShoppingCart,
  IconFlag,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Modern',
    icon: IconAperture,
    href: '/dashboards/modern',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Energy Retailers',
    icon: IconAperture,
    href: '/energy-retailers',
    // chip: 'New',
    chipColor: 'secondary',
  },

  {
    id: uniqueId(),
    title: 'Brands',
    icon: IconUserCircle,
    href: '/brands/compare-your-bill',
    children: [
      {
        id: uniqueId(),
        title: 'Compare Your Bill',
        icon: IconPoint,
        href: '/brands/compare-your-bill',
      },
      {
        id: uniqueId(),
        title: 'Deal Expert',
        icon: IconPoint,
        href: '/brands/deal-expert',
      },
      {
        id: uniqueId(),
        title: 'Check Your Bills',
        icon: IconPoint,
        href: '/brands/check-your-bill',
      },

    ],
  },
  
  {
    id: uniqueId(),
    title: 'Create Leads',
    icon: IconAperture,
    href: '/create-leads',
    chipColor: 'secondary',
  },

  // {
  //   navlabel: true,
  //   subheader: 'Apps',
  // },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserCircle,
    href: '/users',
    
  },


  {
    id: uniqueId(),
    title: 'Offers',
    icon: IconFlag,
    href: '/offers', 
  },

  {
    id: uniqueId(),
    title: 'Sellable Locations',
    icon: IconFlag,
    href: '/sellable-locations', 
  },
];

export default Menuitems;
