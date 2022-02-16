import { Client } from 'pg';
import format from 'pg-format';

import { getInvestorByUserId } from './getInvestorByUserId';
import { getOperatorByUserId } from './getOperatorByUserId';

export const getAllInvestors = async (offset, limit, sortBy, filterBy, searchBy) => {
    let dbResponse = [];

    let filtersStr = ((filterBy || [])?.filter(v => Boolean(v?.array?.length)) || []).reduce((acc, curr, i) => {
        let filterByStr = (curr.array || []).reduce((accInner, currInner, ii) => {
            let newStr = '';
            if (currInner.column === 'investment_amount') {
                const a = currInner?.value?.split('-');
                if (!i && !ii) {
                    newStr = accInner += format(' WHERE ((users.investor = true AND users.id = investors.user_id AND (%s >= %s AND %s <= %s))', `investors.${currInner.column}_min`, a[0], `investors.${currInner.column}_max`, a[1]);
                } else if (!ii) {
                    newStr = accInner += format(' AND ((users.investor = true AND users.id = investors.user_id AND (%s >= %s AND %s <= %s))', `investors.${currInner.column}_min`, a[0], `investors.${currInner.column}_max`, a[1]);
                } else {
                    newStr = accInner += format(' OR (users.investor = true AND users.id = investors.user_id AND (%s >= %s AND %s <= %s))', `investors.${currInner.column}_min`, a[0], `investors.${currInner.column}_max`, a[1]);
                }
            } else {
                if (!i && !ii) {
                    newStr = accInner += format(' WHERE ((users.investor = true AND users.id = investors.user_id AND %s ILIKE %s)', `investors.${currInner.column}`, `'%${currInner.value}%'`);
                } else if (!ii) {
                    newStr = accInner += format(' AND ((users.investor = true AND users.id = investors.user_id AND %s ILIKE %s)', `investors.${currInner.column}`, `'%${currInner.value}%'`);
                } else {
                    newStr = accInner += format(' OR (users.investor = true AND users.id = investors.user_id AND %s ILIKE %s)', `investors.${currInner.column}`, `'%${currInner.value}%'`);
                }
            }

            return newStr;
        }, '');

        if (filterByStr) {
            return acc += format('%s)', filterByStr);
        }

        return acc;
    }, '') || 'WHERE (users.investor = true AND users.id = investors.user_id)';

    if (searchBy) {
        const searchByArray = searchBy?.split(' ');
        filtersStr += searchByArray.reduce((acc, curr, i) => {
            if (!i && curr) {
                return acc += format(' users.email ILIKE %s OR users.first_name ILIKE %s OR users.last_name ILIKE %s OR investors.need ILIKE %s OR investors.investment_category ILIKE %s OR investors.preferred_location ILIKE %s OR investors.investment_type ILIKE %s OR investors.investment_timeframe ILIKE %s OR investors.ideal_operator_description ILIKE %s', `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`);
            } else if (curr) {
                return acc += format(' OR users.email ILIKE %s OR users.first_name ILIKE %s OR users.last_name ILIKE %s OR investors.need ILIKE %s OR investors.investment_category ILIKE %s OR investors.preferred_location ILIKE %s OR investors.investment_type ILIKE %s OR investors.investment_timeframe ILIKE %s OR investors.ideal_operator_description ILIKE %s', `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`, `'%${curr}%'`);
            }

            return acc;
        }, ' AND (') + ')';
    }

    try {
        const client = new Client({ ssl: process.env.NODE_ENV !== 'development' ? { rejectUnauthorized: false, ca: Buffer.from(process.env.PG_CA, 'base64').toString('ascii') } : null });
        await client.connect();
        const formatted = format('SELECT *, count(*) OVER() AS exact_count FROM (SELECT DISTINCT ON (user_id) * FROM investors ORDER BY user_id, investor_last_edit_date) investors INNER JOIN users ON users.id = investors.user_id %s ORDER BY %s OFFSET %s LIMIT %s', filtersStr, `${!sortBy?.column ? 'investor_last_edit_date DESC' : `${sortBy?.column} ${sortBy?.direction}`}`, offset, limit);
        const res = await client.query(formatted);
        dbResponse = res?.rows;
        await client.end();

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
        console.log('error getting investors from db: ', error);
    }

    return dbResponse;
};
