import React from 'react';
import Icon from '../../../components/ui/Icon';
import Scialpinismo from '../../../components/ui/Icon/icons/Scialpinismo.svg';
import Alpinismo from '../../../components/ui/Icon/icons/Alpinismo.svg';
import Escursionismo from '../../../components/ui/Icon/icons/Escursionismo.svg';
import Trail from '../../../components/ui/Icon/icons/Trail.svg';
import Trekking from '../../../components/ui/Icon/icons/Trekking.svg';
import Viaggi from '../../../components/ui/Icon/icons/Viaggi.svg';

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
    return <Icon icon={icon} middle {...props} />;
}
