import pool from './initialize';
import format from 'pg-format';

import { getInvestorByUserId } from './getInvestorByUserId';
import { getOperatorByUserId } from './getOperatorByUserId';

export const getAllOperators = async (offset, limit, sortBy, filterBy, searchBy) => {
    let dbResponse = [];

    let filtersStr = ((filterBy || [])?.filter(v => Boolean(v?.array?.length)) || []).reduce((acc, curr, i) => {
        let filterByStr = (curr.array || []).reduce((accInner, currInner, ii) => {
            let newStr = '';
            if (currInner.column === 'capital_amount') {
                const a = currInner?.value?.split('-');
                if (!i && !ii) {
                    newStr = accInner += format(' WHERE ((users.operator = true AND users.id = operators.user_id AND (%s >= %s AND %s <= %s))', `operators.${currInner.column}_min`, a[0], `operators.${currInner.column}_max`, a[1]);
                } else if (!ii) {
                    newStr = accInner += format(' AND ((users.operator = true AND users.id = operators.user_id AND (%s >= %s AND %s <= %s))', `operators.${currInner.column}_min`, a[0], `operators.${currInner.column}_max`, a[1]);
                } else {
                    newStr = accInner += format(' OR (users.operator = true AND users.id = operators.user_id AND (%s >= %s AND %s <= %s))', `operators.${currInner.column}_min`, a[0], `operators.${currInner.column}_max`, a[1]);
                }
            } else {
                if (!i && !ii) {
                    newStr = accInner += format(' WHERE ((users.operator = true AND users.id = operators.user_id AND %s ILIKE %s)', `operators.${currInner.column}`, `'%${currInner.value}%'`);
                } else if (!ii) {
                    newStr = accInner += format(' AND ((users.operator = true AND users.id = operators.user_id AND %s ILIKE %s)', `operators.${currInner.column}`, `'%${currInner.value}%'`);
                } else {
                    newStr = accInner += format(' OR (users.operator = true AND users.id = operators.user_id AND %s ILIKE %s)', `operators.${currInner.column}`, `'%${currInner.value}%'`);
                }
            }

            return newStr;
        }, '');

        if (filterByStr) {
            return acc += format('%s)', filterByStr);
        }

        return acc;
    }, '') || 'WHERE (users.operator = true AND users.id = operators.user_id)';

    if (searchBy) {
        const searchByArray = searchBy?.split(' ');
        filtersStr += searchByArray.reduce((acc, curr, i) => {
            if (!i && curr) {
                return acc += format(' users.email ILIKE %s OR users.first_name ILIKE %s OR users.last_name ILIKE %s OR operators.need ILIKE %s OR operators.operating_category ILIKE %s OR operators.preferred_location ILIKE %s OR operators.investment_type ILIKE %s OR operators.timeframe ILIKE %s OR operators.ideal_investor_description ILIKE %s', `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`);
            } else if (curr) {
                return acc += format(' OR users.email ILIKE %s OR users.first_name ILIKE %s OR users.last_name ILIKE %s OR operators.need ILIKE %s OR operators.operating_category ILIKE %s OR operators.preferred_location ILIKE %s OR operators.investment_type ILIKE %s OR operators.timeframe ILIKE %s OR operators.ideal_investor_description ILIKE %s', `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`);
            }

            return acc;
        }, ' AND (') + ')';
    }

    try {
        const formatted = format('SELECT *, count(*) OVER() AS exact_count FROM (SELECT DISTINCT ON (user_id) * FROM operators ORDER BY user_id, operator_last_edit_date) operators INNER JOIN users ON users.id = operators.user_id %s ORDER BY %s OFFSET %s LIMIT %s', filtersStr, `${!sortBy?.column ? 'operator_last_edit_date DESC' : `${sortBy?.column} ${sortBy?.direction}`}`, offset, limit);
        const res = await pool.query(formatted);
        dbResponse = res?.rows;

        // const promiseArray = (dbResponse || []).reduce((acc, curr) => {
        //     const p = new Promise(async resolve => {
        //         const r = await Promise.allSettled([getInvestorByUserId(curr.id, true), getOperatorByUserId(curr.id, true)]);
        //         resolve([...((r?.[0]?.value || []).concat(r?.[1]?.value || []))]);
        //     });
        //     acc.push(p);
        //
        //     return acc;
        // }, []);
        //
        // const results = await Promise.allSettled(promiseArray);
        //
        // dbResponse = (dbResponse || []).map((user, i) => {
        //     if (
        //         !user?.allOpportunities &&
        //         user?.id === results?.[i]?.value?.[0]?.user_id
        //     ) {
        //         user.allOpportunities = [...(results?.[i]?.value || [])];
        //     } else if (user?.id === results?.[i]?.value?.[0]?.user_id) {
        //         user.allOpportunities.push(...(results?.[i]?.value || []));
        //     }
        //
        //     return user;
        // })
    } catch (error) {
        console.log('error getting operators from db: ', error);
    }

    return dbResponse;
};
