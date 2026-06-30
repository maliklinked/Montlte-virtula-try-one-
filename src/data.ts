import { Product, Transaction, Garment } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Obsidian Briefcase',
    sku: 'MNL-BFC-01',
    category: 'Heritage',
    price: 1250,
    stock: 42,
    status: 'In Stock',
    description: 'Sleek, minimalist leather briefcase in deep obsidian black, displayed on a pristine white marble pedestal. Crafted from premium full-grain leather with matte black hardware. Perfect for the modern creative professional.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4dW3OSCJLPampJ8paTCYjRnauEjpYI13qn4WPYtYwPk2Uo60Zjz0rNaKAUF2tuGXOMawBGXG3ypVhsF9cqvWoCL9Uz7ztTXHC24W0nAC3IL8qyIK0EVMI4vN0rBaMi_sPvoonZ3g2uwYujdFwPClv0up5b_NoBbtgKpmNRv4sYLs-vdRPfzCe2P9r0NqOeEOC2M01vOnwEnr7U3ciyqn-urRMCqR1hpyDTU1RI2FjRQ4gKKW-U0gEiEQ4o_WcijaiRveswSvjZLM',
    colors: ['Deep Obsidian', 'Classic Charcoal'],
    sizes: ['One Size']
  },
  {
    id: '2',
    name: 'Titanium Chronograph',
    sku: 'MNL-WTCH-04',
    category: 'Bespoke',
    price: 3400,
    stock: 3,
    status: 'Low Stock',
    description: 'Minimalist architectural wristwatch featuring a matte black dial and a brushed titanium case. Presented against geometric precision and premium craftsmanship. Equipped with custom high-end automatic movement.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFRsSylzphG1LbkDDYL50PMu22M-X2u4jhHVi-4967easYy8c8S0MA_GXPTnIv62hfAqo4MGTBMHB0XcRyUNtixIIHYm9BLQUXGkLc4Ah5M8pgK8H_YYd2kxCssXhYRgvYdYPvvv5ACzEz4zzXJybHOSxGvfKXjhc0Br67eF8H_zLjyyVA53UiDm-l8eXWNmugtbTEeROqZNXvIolkpsMeylxWQaBSFPrenDeC8HMBZ6ioLWMYbGJ-XRAIOIc4ZOaqBVGLLbbbFok',
    colors: ['Brushed Titanium', 'DLC Black'],
    sizes: ['40mm', '42mm']
  },
  {
    id: '3',
    name: 'Structural Combat Boot',
    sku: 'MNL-BT-09',
    category: 'New Arrivals',
    price: 890,
    stock: 0,
    status: 'Out of Stock',
    description: 'Structural, high-fashion mens boots made from matte black structured calfskin. Sculpted geometric silhouette designed for comfortable stride with distinct architectural detailing.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_hTZ3wllpakxKmEO5wDJi8y2CsabWJHZnXbSWH8qWaNpHPZNFjqUoEwqPxih_7sqMggT0FOmy9ae5CzGcl8VUXunL8DfXX1mKkSjPA049S60pd0WhkDzfqo7V5v6g8qDQmmVGi-I9kEkKC4rb0IzGb0zZqlLW7hIruncWAsVd5X33pjqz5MFUjZ_CKYhWUZ9E-Tq-u4U9CXYitt2tDe7UEh1H4g9qzL3IJJbEHXKjR_8_vOcL_nK3pborRw9RW5aOqYPukv95nU',
    colors: ['Matte Black', 'Stark White'],
    sizes: ['41', '42', '43', '44']
  },
  {
    id: '4',
    name: 'Geometric Signet Ring',
    sku: 'MNL-RNG-02',
    category: 'Bespoke',
    price: 450,
    stock: 15,
    status: 'In Stock',
    description: 'Minimalist, sculptural geometric ring made of brushed dark gunmetal. Designed to stand out with its rough finish contrasted by precise luxury machining.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV6ZGEYmx8Gquce4zp1BJOim97x-CJTPu9BsUvAbja0HlIyiolb8yDe_KHawHM0ji-GCZi3hoPM32V9S1Z8IfUHZFmgfeE5YiDiAW_KyMJVjnRWtGvPqe_0h0wsX6PS_jGO-_ff3EaMfwXqIwrUxuwSBMk2p3jFixpz-o0B3bEtE7lSg7lJOxUEEFaqRiPa9AtNtbcx7aA43s48JF6-oWDffCATJE47YAPugQFaLMOfH3H-bYCmolMxIn6LNgcnt3BuzI78RlKLo0',
    colors: ['Brushed Dark Gunmetal', 'Polished Silver'],
    sizes: ['9', '10', '11']
  },
  {
    id: '5',
    name: 'Obsidian Structured Tote',
    sku: 'MNL-TTE-07',
    category: 'Bespoke',
    price: 1450,
    stock: 24,
    status: 'In Stock',
    description: 'Stunning, high-end black structured tote bag resting on a white architectural plinth. Exquisite stitching, premium luxurious materials, and precise geometry make this a standout masterpiece.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj3iR3FYFuhLvf3ABgZT1fqmFeJW9CZjtkOZND8ek4VfFQTFrCfJAu6p7yuWCeJukHzSmYXuepsX2Ym9AH-SnUZdCZT8Am9aMb3JEw7IBhWkVDGFQ_b-Wip0ju_SrAzkU_rv8StBJbZSL42Mi-Bmu2XwcxicidkECNeFXIBxVceYT6D5Br9RWFrsIobS4dErBc2RQo_aAakC5FeBUC8Y4YVrRMNKmhg4UW2CORdziwK93lPX03SuemRCEAjGSgheKBngPyjkbOHVQ',
    colors: ['Obsidian Black', 'Pure Alabaster'],
    sizes: ['Medium', 'Large']
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    productName: 'Bespoke Cashmere Overcoat',
    clientName: 'M. Sterling',
    amount: 4200,
    time: '10 MINS AGO',
    type: 'sale',
    iconName: 'shopping_bag'
  },
  {
    id: 'tx-2',
    productName: 'Heritage Leather Weekender',
    clientName: 'Dispatched to S. Laurent',
    amount: 1850,
    time: '1 HR AGO',
    type: 'shipping',
    statusLabel: 'Status: Dispatched',
    iconName: 'local_shipping'
  },
  {
    id: 'tx-3',
    productName: 'New Client Registration',
    clientName: 'Private Access Requested',
    amount: 0,
    time: '3 HRS AGO',
    type: 'registration',
    statusLabel: 'Tier: Private Access Requested',
    iconName: 'person_add'
  }
];

export const TRY_ON_GARMENTS: Garment[] = [
  {
    id: 'g-1',
    name: 'OBSIDIAN BLAZER',
    tag: 'Obsidian Blazer',
    description: 'High-end black tailored jacket. Architectural cut, premium structured wool.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr-kzeJ6oz0xZjXKw7ZtUWSys2OmoQyas6CEGVx4CFthqNOZ3R9D_gREjFbjkADvE528OuHe-EJgvi4Lj-eyNbhNQWdTJt9ahPURW9DFx6j82twVqdWs-igMReJZZ1pilhST6e07lIbKgsIVwLyKs9CkifqH1AXlHEoogOalftcpA6526XpQZv4ryYNI-DAbQP4hbaJP7LRiBFR-Hytat1mFi7ZsQGDOgd-ouvELFhwkg2oeRyFVt4Hacx6g5iBPjzZcm9TNxKHpk',
    resultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRqwrkNFiXE5-JfN5arUmPpPBvo_SLnNhNsSA5GHKpCF7bltoU32iuo3bf3ymvLCy1FPLzCAVtubRwFvc4gTlvnfPA33nJEmmo8zefBj2SgySt-J2rvwdBpgncyDLhlVjoB8unYhCuOYdo94DY2hK-YRmGTyilCQNJtkzJ3Uv6J3aKmcnrWfIZRiffYVgDefOxqf8vIMILObTKT9WqnHPI6mFGdjE_5XFwn2opiAnjjBueXrPwiBMDDx984YQxejrTDa9bwIBRc9g',
    promptAlt: 'A high-end flat lay photograph of a minimalist black tailored jacket on a pristine white background. The lighting is studio quality, emphasizing the fine texture of the premium fabric and the sharp, architectural cut of the garment. The mood is sophisticated and luxurious.'
  },
  {
    id: 'g-2',
    name: 'BONE HOODIE',
    tag: 'Bone Hoodie',
    description: 'Cream-colored oversized hoodie with relaxed silhouette and heavy luxurious weight.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjmkKTISPMqbdL4jMEiMTX-d6EHiaoeOoiyUazA9djZD5-EqVAoEpLzAdJKAEmQqH8HZfRM_LShwXj2Cma7S_CCs2DFGDwpnM12Lv4mWtFqruoSeyGNLXDVrSUoN3f9JHBJa6hUzA4OpxsIPq_mMl3pwl3IU9lBNUqvoPXJhr-gZoKhTjgq-5jpRiFngSEp4eXdGC4rsjD2ViLtfs4Pmxqm67l9JCNjGohls_qxKlX0YHJIIJgdyhuLwUKndftiNeiyxaxze0Jad8',
    // We can use a different cropped or elegant default image since we only have one main tryon model output, but we can also use styled fallback overlays or let them see the same model in different modes. Actually, we can use the main model for blazer, or style it!
    resultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAguL3_6QPe_6eH1P4Vv4ARn1ik1DE-edaeuaBGSNhZcNGBRw3fxNmnbKSdN1Hu8T87XK88b22_afn-LPiWobqJJb1xevcSpu1UUqhWLYZP-W-bVderlN3_MBPoCaDiARc_6oj4cWzezbSot3bN5kL7wQocADumn5FApBq8GW4oPwo3NgUAbMEyEELoeFOscvil700cBUL1EvyXHHPImN7mlcZJjrJ7dux7C8Heu0W5k_SRR2oCekXSOAsL7T4OHLnljGBhkCC0cWw',
    promptAlt: 'A high-end flat lay photograph of a minimalist cream-colored oversized hoodie on a pristine white background. The lighting is soft and diffused, creating subtle shadows that highlight the garment\'s heavy, luxurious weight and relaxed silhouette. The aesthetic is modern and clean.'
  },
  {
    id: 'g-3',
    name: 'TECH SHIRT',
    tag: 'Tech Shirt',
    description: 'Charcoal technical overshirt with precise hidden seams and subtle utility sheen.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2LLPyVkVhTQHXYetDbijARUTOiDhMnCc7RQB37gE21X42qHOMGSOCJMQ4gHLBRHRJcrp02vWUv1Sd8EsdFE6bMceupRpvO5c_ubilBPAfXKyNvxZsfBFI2wquBzSVCN_ULepqwwMib2KixCouV3AOvQjYNZSpLnYmVKFzEFSIaU4hmVx0t7hpKtXNvszZkoBlPxS5HWCGaIuAycWGBja8eCQGukLVoVkGVGK6cXCZUbYB-WcKBFrM7syCG7sK0vBvOAlww_uHou4',
    resultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAguL3_6QPe_6eH1P4Vv4ARn1ik1DE-edaeuaBGSNhZcNGBRw3fxNmnbKSdN1Hu8T87XK88b22_afn-LPiWobqJJb1xevcSpu1UUqhWLYZP-W-bVderlN3_MBPoCaDiARc_6oj4cWzezbSot3bN5kL7wQocADumn5FApBq8GW4oPwo3NgUAbMEyEELoeFOscvil700cBUL1EvyXHHPImN7mlcZJjrJ7dux7C8Heu0W5k_SRR2oCekXSOAsL7T4OHLnljGBhkCC0cWw',
    promptAlt: 'A high-end flat lay photograph of a minimalist charcoal technical overshirt on a pristine white background. The lighting is crisp, highlighting the technical fabric\'s subtle sheen and the precise, hidden seams. The overall vibe is utilitarian luxury.'
  }
];
