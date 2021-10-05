import React from 'react';
import Icon from '../../../components/ui/Icon';
import Scialpinismo from '../../../public/icons/Scialpinismo.svg';
import Alpinismo from '../../../public/icons/Alpinismo.svg';
import Escursionismo from '../../../public/icons/Escursionismo.svg';
import Trail from '../../../public/icons/Trail.svg';
import Trekking from '../../../public/icons/Trekking.svg';
import Viaggi from '../../../public/icons/Viaggi.svg';

export default function PostCategoryIcon({ category, ...props }) {
    let icon;
    if (category === 'Scialpinismo') {
        icon = Scialpinismo;
    } else if (category === 'Alpinismo') {
        icon = Alpinismo;
    } else if (category === 'Escursionismo') {
        icon = Escursionismo;
    } else if (category === 'Trail') {
        icon = Trail;
    } else if (category === 'Trekking') {
        icon = Trekking;
    } else if (category === 'Viaggi') {
        icon = Viaggi;
    }
    return <Icon icon={icon} {...props} />;
}
