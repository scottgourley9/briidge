import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { useGetOperators } from './hooks/useGetOperators';

import { debounce } from '../../helpers/debounce';

import Button from '../Common/Button';
import Select from '../Common/Select';
import ConnectModal from '../ConnectModal';

import styles from './Operators.module.scss';

let onGetOperatorsDebounced;
let resetDebounced;

const Operators = ({
    operators,
    user
}) => {
    const formRef = useRef();

    const [selectedConnect, updateSelectedConnect] = useState({});
    const [showModal, updateShowModal] = useState(false);
    const [limit, updateLimit] = useState(5);
    const [offset, updateOffset] = useState(0);
    const [sortBy, updateSortBy] = useState({});
    const [amountFilter, updateAmountFilter] = useState([]);
    const [categoryFilter, updateCategoryFilter] = useState([]);
    const [locationFilter, updateLocationFilter] = useState([]);
    const [typeFilter, updateTypeFilter] = useState([]);
    const [timeframeFilter, updateTimeframeFilter] = useState([]);
    const [isMounted, updatedIsMounted] = useState(false);
    const [operatorsList, updateOperatorsList] = useState(operators || []);
    const [searchBy, updateSearchBy] = useState('');

    const operatorCount = operatorsList?.[0]?.exact_count || 0;

    const { onGetOperators, isLoading, data } = useGetOperators();

    if (!onGetOperatorsDebounced) {
        onGetOperatorsDebounced = debounce(onGetOperators, 500);
    }

    const reset = () => {
        updateLimit(5);
        updateOffset(0);
        updateSortBy({
            column: 'operator_last_edit_date',
            direction: 'DESC'
        });
        updateAmountFilter([]);
        updateCategoryFilter([]);
        updateLocationFilter([]);
        updateTypeFilter([]);
        updateTimeframeFilter([]);
        formRef?.current?.reset();
    }

    if (!resetDebounced) {
        resetDebounced = debounce(reset, 500);
    }

    useEffect(() => {
        updatedIsMounted(true);
    }, []);

    useEffect(() => {
        if (data?.data) {
            updateOperatorsList(data?.data);
        }
    }, [data]);

    useEffect(() => {
        if (isMounted && !isLoading) {
            onGetOperators({
                limit: 5,
                offset: 0,
                sortBy,
                filterBy: [
                    { array: amountFilter },
                    { array: categoryFilter },
                    { array: locationFilter },
                    { array: typeFilter },
                    { array: timeframeFilter }
                ],
                searchBy
            });
            updateLimit(5);
            updateOffset(0);
        }
    }, [sortBy, amountFilter, categoryFilter, locationFilter, typeFilter, timeframeFilter]);

    useEffect(() => {
        if (isMounted && !isLoading) {
            onGetOperators({
                limit,
                offset,
                sortBy,
                filterBy: [
                    { array: amountFilter },
                    { array: categoryFilter },
                    { array: locationFilter },
                    { array: typeFilter },
                    { array: timeframeFilter }
                ],
                searchBy
            });
        }
    }, [limit, offset]);

    useEffect(() => {
        if (isMounted && !isLoading) {
            onGetOperatorsDebounced({
                limit: 5,
                offset: 0,
                sortBy: {
                    column: 'operator_last_edit_date',
                    direction: 'DESC'
                },
                filterBy: [
                    { array: [] },
                    { array: [] },
                    { array: [] },
                    { array: [] },
                    { array: [] }
                ],
                searchBy
            });
            resetDebounced();
        }
    }, [searchBy]);

    const handleAmountFilter = e => {
        const value = e?.target?.value;
        const a = value.split('-');
        let copy = [...amountFilter];

        if (e?.target?.checked) {
            copy.push(
                {
                    column: 'capital_amount',
                    value: `${a[0]}-${a[1]}`
                }
            );
        } else {
            copy = copy.filter(v => v.value !== value);
        }

        updateAmountFilter(copy);
    };

    const handleFilter = (e, type, column, updateStatefunc) => {
        const value = e?.target?.value;
        let copy = [...type];

        if (e?.target?.checked) {
            copy.push(
                {
                    column,
                    value
                }
            );
        } else {
            copy = copy.filter(v => v.value !== value);
        }

        updateStatefunc(copy);
    }

    const handleConnectClick = operator => {
        updateSelectedConnect(operator);
        updateShowModal(true);
    }

    const paginationNote = () => {
        if (!operatorCount) {
            return null
        }
        const from = offset || 1;
        const to = (from + limit - 1) > operatorCount ? operatorCount : from + limit - 1;

        return `${from} - ${to} of ${operatorCount}`;
    }

    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    return (
        <>
            <form ref={formRef}>
                <div>Filters</div>
                Operators {paginationNote()}
                <input type="text" value={searchBy} onChange={e => updateSearchBy(e.target.value)} />
                <Select
                    onChange={e => {
                        const a = e?.target?.value?.split('-');
                        updateSortBy({
                            column: a[0],
                            direction: a[1]
                        });
                    }}
                    disabled={isLoading}
                    options={[
                        { value: 'operator_last_edit_date-DESC', description: 'Newest - Oldest' },
                        { value: 'operator_last_edit_date-ASC', description: 'Oldest - Newest' },
                        { value: 'first_name-ASC', description: 'First Name A-Z' },
                        { value: 'first_name-DESC', description: 'First Name Z-A' },
                        { value: 'last_name-ASC', description: 'Last Name A-Z' },
                        { value: 'last_name-DESC', description: 'Last Name Z-A' }
                    ]}
                />
                <div>
                    <input disabled={isLoading} type="checkbox" value="0-50000" onChange={handleAmountFilter} /> <span>$0-$50,000</span>
                    <input disabled={isLoading} type="checkbox" value="50000-100000" onChange={handleAmountFilter} /> <span>$50,000-$100,000</span>
                    <input disabled={isLoading} type="checkbox" value="100000-150000" onChange={handleAmountFilter} /> <span>$100,000-$150,000</span>
                    <input disabled={isLoading} type="checkbox" value="150000-200000" onChange={handleAmountFilter} /> <span>$150,000-$200,000</span>
                    <input disabled={isLoading} type="checkbox" value="200000-250000" onChange={handleAmountFilter} /> <span>$200,000-$250,000</span>
                    <input disabled={isLoading} type="checkbox" value="250000-300000" onChange={handleAmountFilter} /> <span>$250,000-$300,000</span>
                    <input disabled={isLoading} type="checkbox" value="300000-350000" onChange={handleAmountFilter} /> <span>$300,000-$350,000</span>
                    <input disabled={isLoading} type="checkbox" value="350000-400000" onChange={handleAmountFilter} /> <span>$350,000-$400,000</span>
                    <input disabled={isLoading} type="checkbox" value="400000-450000" onChange={handleAmountFilter} /> <span>$400,000-$450,000</span>
                    <input disabled={isLoading} type="checkbox" value="450000-500000" onChange={handleAmountFilter} /> <span>$450,000-$500,000</span>
                    <input disabled={isLoading} type="checkbox" value="500000-9999999999" onChange={handleAmountFilter} /> <span>$500,000+</span>
                </div>
                <div>
                    <input disabled={isLoading} type="checkbox" value="Spilled Milk Ice Cream" onChange={e => handleFilter(e, categoryFilter, 'operating_category', updateCategoryFilter)} /> <span>Spilled Milk Ice Cream</span>
                    <input disabled={isLoading} type="checkbox" value="Crumbl" onChange={e => handleFilter(e, categoryFilter, 'operating_category', updateCategoryFilter)} /> <span>Crumbl</span>
                    <input disabled={isLoading} type="checkbox" value="Fiiz Drinks" onChange={e => handleFilter(e, categoryFilter, 'operating_category', updateCategoryFilter)} /> <span>Fiiz Drinks</span>
                    <input disabled={isLoading} type="checkbox" value="Dirty Dough" onChange={e => handleFilter(e, categoryFilter, 'operating_category', updateCategoryFilter)} /> <span>Dirty Dough</span>
                </div>
                <div>
                    {states.map((state, i) => (
                        <div key={`${state}${i}`}>
                            <input disabled={isLoading} type="checkbox" value={state} onChange={e => handleFilter(e, locationFilter, 'preferred_location', updateLocationFilter)} /> <span>{state}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <input disabled={isLoading} type="checkbox" value="Debt Investment" onChange={e => handleFilter(e, typeFilter, 'investment_type', updateTypeFilter)} /> <span>Debt Investment</span>
                    <input disabled={isLoading} type="checkbox" value="Convertible Note" onChange={e => handleFilter(e, typeFilter, 'investment_type', updateTypeFilter)} /> <span>Convertible Note</span>
                    <input disabled={isLoading} type="checkbox" value="Equity Partnership" onChange={e => handleFilter(e, typeFilter, 'investment_type', updateTypeFilter)} /> <span>Equity Partnership</span>
                    <input disabled={isLoading} type="checkbox" value="Other" onChange={e => handleFilter(e, typeFilter, 'investment_type', updateTypeFilter)} /> <span>Other</span>
                </div>
                <div>
                    <input disabled={isLoading} type="checkbox" value="ASAP (within 30 days)" onChange={e => handleFilter(e, timeframeFilter, 'timeframe', updateTimeframeFilter)} /> <span>ASAP (within 30 days)</span>
                    <input disabled={isLoading} type="checkbox" value="1-2 months" onChange={e => handleFilter(e, timeframeFilter, 'timeframe', updateTimeframeFilter)} /> <span>1-2 months</span>
                    <input disabled={isLoading} type="checkbox" value="2-6 months" onChange={e => handleFilter(e, timeframeFilter, 'timeframe', updateTimeframeFilter)} /> <span>2-6 months</span>
                    <input disabled={isLoading} type="checkbox" value="6 months +" onChange={e => handleFilter(e, timeframeFilter, 'timeframe', updateTimeframeFilter)} /> <span>6 months +</span>
                </div>
                {operatorsList.map((operator, i) => {
                    const additionalOpportunites = operator?.allOpportunities?.slice(1) || [];

                    return (
                        <div key={`${operator?.id}${i}`}>
                            <Link href={`/profile/${operator?.user_id}`}>
                                <img src={operator?.picture} alt="profile pic" />
                            </Link>
                            <Link href={`/profile/${operator?.user_id}`}>
                                <h3>{operator?.first_name} {operator?.last_name}</h3>
                            </Link>
                            <p>{operator?.preferred_location}</p>
                            <p>{operator?.website}</p>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                    handleConnectClick(operator);
                                }}
                            >
                                Connect
                            </Button>
                            <p>Looking for {operator?.need}</p>
                            <p>{operator?.capital_amount_min && operator?.capital_amount_max ? `${operator?.capital_amount_min} - ${operator?.capital_amount_max}` : operator?.capital_amount_max} needed</p>
                            <p>{operator?.ideal_investor_description}</p>
                            <p>{operator?.operating_category}</p>
                            <p>{operator?.investment_type}</p>
                            <p>{operator?.timeframe}</p>
                            {additionalOpportunites?.length > 0 &&
                                <>
                                    <p>Additional Opportunities</p>
                                    <div>
                                        {additionalOpportunites.map((v, ii) => {
                                            return (
                                                <div key={`opportunity${ii}`} >{v?.need}</div>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                        </div>
                    )
                })}
                <>
                    <button type="button" disabled={!(offset > 0) || isLoading} onClick={() => {
                        updateOffset(offset - limit);
                    }}>
                        Previous
                    </button>
                    <button type="button" disabled={!(((offset + 1) * limit) < operatorCount) || isLoading} onClick={() => {
                        updateOffset(offset + limit);
                    }}>
                        Next
                    </button>
                </>
            </form>
            <ConnectModal
                updateShowModal={updateShowModal}
                showModal={showModal}
                updateSelectedConnect={updateSelectedConnect}
                selectedConnect={selectedConnect}
                user={user}
            />
        </>
    );
}

export default Operators;
