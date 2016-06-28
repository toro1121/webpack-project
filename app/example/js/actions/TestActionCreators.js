//constant
import AppConstants from '../constants/AppConstants';
//action
import AppActionCreators from './AppActionCreators';

let ActionCreators = Object.assign(AppActionCreators, {
    data: (page, sort) => {
        ActionCreators.ajax({
            url: '/admin/shop/listjson',
            data: {
                p: page ? page : 1,
                sby: sort ? sort.prop : 'id',
                asc: sort ? sort.order == 'descending' ? 'desc' : 'asc' : 'asc'
            }
        }, AppConstants.ADMIN_SHOP_DATA);
    }
});

export default ActionCreators;
