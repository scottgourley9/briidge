import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';

import configs from '../../configs';

import { useGetOperators } from './hooks/useGetOperators';

import { debounce } from '../../helpers/debounce';
import { disableBackgroundScroll } from '../../helpers/disableBackgroundScroll';

import Button from '../Common/Button';
import Select from '../Common/Select';
import ConnectModal from '../ConnectModal';
import Chevron from '../SVG/Chevron';
import Input from '../Common/Input';
import User from './User';
import Alert from '../Common/Alert';

import styles from './Operators.module.scss';

let onGetOperatorsDebounced;
let resetDebounced;

const Operators = ({
    operators,
    user
}) => {
    const formRef = useRef();
    const filtersRef = useRef();

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
    const [showFilters, updateShowFilters] = useState(false);
    const [filterByObj, updateFilterByObject] = useState({
        amount: false,
        category: false,
        location: false,
        type: false,
        timeframe: false
    });

    const operatorCount = operatorsList?.[0]?.exact_count || 0;

    const { onGetOperators, isLoading, data } = useGetOperators();

    if (!onGetOperatorsDebounced) {
        onGetOperatorsDebounced = debounce(onGetOperators, 500);
    }

    const resetFitler = () => {
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
        updateSearchBy('');
        updateFilterByObject({
            amount: false,
            category: false,
            location: false,
            type: false,
            timeframe: false
        });
        formRef?.current?.reset();
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
        formRef.current.addEventListener('submit', e => e.preventDefault());
    }, []);

    useEffect(() => {
        let canceled = false;
        if (!canceled && data?.data) {
            updateOperatorsList(data?.data);
        }

        return () => {
            canceled = true;
        }
    }, [data]);

    useEffect(() => {
        let canceled = false;
        if (isMounted && !isLoading && !canceled) {
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

        return () => {
            canceled = true;
        }
    }, [sortBy, amountFilter, categoryFilter, locationFilter, typeFilter, timeframeFilter]);

    useEffect(() => {
        let canceled = false;
        if (isMounted && !isLoading && !canceled) {
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

        return () => {
            canceled = true;
        }
    }, [limit, offset]);

    useEffect(() => {
        let canceled = false;
        if (isMounted && !isLoading && !canceled) {
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

        return () => {
            canceled = true;
        }
    }, [searchBy]);

    useEffect(() => {
        disableBackgroundScroll(showFilters);
    }, [showFilters]);

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
        const from = offset + 1;
        const to = (from + limit - 1) > operatorCount ? operatorCount : from + limit - 1;

        return `${from} - ${to} of ${operatorCount}`;
    }

    const renderAmounts = useMemo(() => {
        const a = ['$0-$50,000', '$50,000-$100,000', '$100,000-$150,000', '$150,000-$200,000', '$200,000-$250,000', '$250,000-$300,000', '$300,000-$350,000', '$350,000-$400,000', '$400,000-$450,000', '$450,000-$500,000', '$500,000+'];

        return a.map((v, i) => {
            let newValue = v?.replace(/[^0-9-]/gi, '');
            if (i + 1 === a.length) {
                newValue = `${newValue}-9999999999`;
            }

            return (
                <div key={`${v}${i}`}>
                    <input disabled={isLoading} type="checkbox" id={`${v}${i}`} value={newValue} onInput={handleAmountFilter} /> <label htmlFor={`${v}${i}`}>{v}</label>
                </div>
            )
        });
    }, [amountFilter, isLoading]);

    const renderCategories = useMemo(() => {
        const a = configs['franchise.categories'];

        return a.map((v, i) => {
            return (
                <div key={`${v}${i}`}>
                    <input disabled={isLoading} type="checkbox" id={`${v}${i}`} value={v} onInput={e => handleFilter(e, categoryFilter, 'operating_category', updateCategoryFilter)} /> <label htmlFor={`${v}${i}`}>{v}</label>
                </div>
            )
        });
    }, [categoryFilter, isLoading]);

    const renderLocation = useMemo(() => {
        const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        return states.map((v, i) => {
            return (
                <div key={`${v}${i}`}>
                    <input disabled={isLoading} type="checkbox" id={`${v}${i}`} value={v} onInput={e => handleFilter(e, locationFilter, 'preferred_location', updateLocationFilter)} /> <label htmlFor={`${v}${i}`}>{v}</label>
                </div>
            )
        });
    }, [locationFilter, isLoading]);

    const renderType = useMemo(() => {
        const a = ['Debt Investment', 'Convertible Note', 'Equity Partnership', 'Other'];

        return a.map((v, i) => {
            return (
                <div key={`${v}${i}`}>
                    <input disabled={isLoading} type="checkbox" id={`${v}${i}`} value={v} onInput={e => handleFilter(e, typeFilter, 'investment_type', updateTypeFilter)} /> <label htmlFor={`${v}${i}`}>{v}</label>
                </div>
            )
        });
    }, [typeFilter, isLoading]);

    const renderTimeframe = useMemo(() => {
        const a = ['ASAP (within 30 days)', '1-2 months', '2-6 months', '6 months +'];

        return a.map((v, i) => {
            return (
                <div key={`${v}${i}`}>
                    <input disabled={isLoading} type="checkbox" id={`${v}${i}`} value={v} onInput={e => handleFilter(e, timeframeFilter, 'timeframe', updateTimeframeFilter)} /> <label htmlFor={`${v}${i}`}>{v}</label>
                </div>
            )
        });
    }, [timeframeFilter, isLoading]);

    const numOfPages = useMemo(() => {
        return Math.ceil((operatorCount || 0) / (limit || 1));
    }, [operatorCount, limit]);

    const renderedPages = useMemo(() => {
        try {
            const onPage = Math.ceil((offset + 1) / limit);
            const firstPage = 1;
            const lastPage = numOfPages;

            let a = [onPage - 1, onPage, onPage + 1 <= numOfPages ? onPage + 1 : null];
            if (a[0] <= 0) {
                // shift left
                a = [onPage, onPage + 1, onPage + 2 <= numOfPages ? onPage + 2 : null];
            } else if (a[1] >= numOfPages) {
                // shift right
                a = [onPage - 2, onPage - 1, onPage];
            }

            return a.map((v, i) => {
                if (!v) {
                    return ''
                }

                if (onPage === v) {
                    return <div key={`${v}${i}`} className={`${styles['pagination-number']} ${styles['selected-pagination-number']}`.trim()} >{v}</div>
                }

                return <div key={`${v}${i}`} className={styles['pagination-number']} onClick={() => updateOffset((v - 1) * limit)}>{v}</div>
            });
        } catch (e) {
            return '';
        }
    }, [offset, limit, numOfPages]);


    return (
        <>
            <form ref={formRef} className={styles['type-page-wrapper']}>
                <div className={styles['filters-section']}>
                    <div onClick={() => updateShowFilters(false)} className={`${styles['fitlers-background']} ${styles['animate__animated']} ${showFilters ? styles['animate__fadeIn'] : styles['animate__fadeOut']}`.trim()}/>
                    <div ref={filtersRef} className={`${styles.filters} ${showFilters ? styles['filters-showing'] : ''}`.trim()}>
                        <div className={styles['close-icon']}>
                            <GrClose onClick={() => updateShowFilters(false)} />
                        </div>
                        <h3 className={styles['filters-title']}>Filters</h3>
                        <Input
                            containerClassName={styles['search-field']}
                            value={searchBy}
                            onInput={e => updateSearchBy(e.target.value)}
                            placeholder="Search"
                            size="xs"
                        />
                        <h4
                            className={styles['filter-by-title']}
                            onClick={() => updateFilterByObject({
                                ...filterByObj,
                                amount: !filterByObj?.amount
                            })}
                        >
                            Amount<Chevron />
                        </h4>
                        <div className={`${styles['filter-by']} ${filterByObj?.amount ? styles['show-filter-by-section'] : ''}`.trim()}>
                            {renderAmounts}
                        </div>
                        <h4
                            className={styles['filter-by-title']}
                            onClick={() => updateFilterByObject({
                                ...filterByObj,
                                category: !filterByObj?.category
                            })}
                        >
                            Category<Chevron />
                        </h4>
                        <div className={`${styles['filter-by']} ${filterByObj?.category ? styles['show-filter-by-section'] : ''}`.trim()}>
                            {renderCategories}
                        </div>
                        <h4
                            className={styles['filter-by-title']}
                            onClick={() => updateFilterByObject({
                                ...filterByObj,
                                location: !filterByObj?.location
                            })}
                        >
                            Location<Chevron />
                        </h4>
                        <div className={`${styles['filter-by']} ${filterByObj?.location ? styles['show-filter-by-section'] : ''}`.trim()}>
                            {renderLocation}
                        </div>
                        <h4
                            className={styles['filter-by-title']}
                            onClick={() => updateFilterByObject({
                                ...filterByObj,
                                type: !filterByObj?.type
                            })}
                        >
                            Type<Chevron />
                        </h4>
                        <div className={`${styles['filter-by']} ${filterByObj?.type ? styles['show-filter-by-section'] : ''}`.trim()}>
                            {renderType}
                        </div>
                        <h4
                            className={styles['filter-by-title']}
                            onClick={() => updateFilterByObject({
                                ...filterByObj,
                                timeframe: !filterByObj?.timeframe
                            })}
                        >
                            Timeframe<Chevron />
                        </h4>
                        <div className={`${styles['filter-by']} ${filterByObj?.timeframe ? styles['show-filter-by-section'] : ''}`.trim()}>
                            {renderTimeframe}
                        </div>
                        <Button containerClassName={`${styles['reset-filters-button']}`.trim()} size="xs" disabled={isLoading} onClick={resetFitler}>
                            Reset Filters
                        </Button>
                    </div>
                </div>
                <div className={styles['user-list-section']}>
                    {(user?.has_incomplete_investors || user?.has_incomplete_operators) &&
                        <Alert
                            size="sm"
                            type="info"
                            title="Complete your profile"
                            link="/profile"
                        >
                            Please go to your profile and fill out the required fields
                        </Alert>
                    }
                    <div className={styles['title-actions']}>
                        <h2 className={styles.title}>Operators<div className={styles['pagination-note']}>{paginationNote()}</div></h2>
                        <div className={styles['filter-and-sort']}>
                            <div className={styles.filter} onClick={() => updateShowFilters(true)}>
                                <span>Filters</span><Chevron />
                            </div>
                            <div className={styles.sort}>
                                <Select
                                    size="xs"
                                    containerClassName={styles['sort-container']}
                                    onChange={e => {
                                        const a = e?.target?.value?.split('-');
                                        updateSortBy({
                                            column: a[0],
                                            direction: a[1]
                                        });
                                    }}
                                    value={sortBy}
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
                            </div>
                        </div>
                    </div>
                    {Boolean(operatorsList?.length) ?
                        (operatorsList.map((operator, i) => (
                            <User
                                operator={operator}
                                handleConnectClick={handleConnectClick}
                                key={`${operator?.id}${i}`}
                            />
                        )))
                        :
                        <p className={styles['no-operators']}>No Operators match your criteria...</p>
                    }
                    {numOfPages > 1 &&
                        <div className={styles['pagination-buttons']}>
                            <Button containerClassName={`${styles['chevron-button']} ${styles.previous} ${!(offset > 0) ? styles['button-disabled'] : ''}`.trim()} size="sm" disabled={!(offset > 0) || isLoading} onClick={() => {
                                updateOffset(offset - limit);
                            }}>
                                <Chevron />
                            </Button>
                            {renderedPages}
                            <Button containerClassName={`${styles['chevron-button']} ${styles.next} ${!((offset + limit) < operatorCount) ? styles['button-disabled'] : ''}`.trim()} size="sm" disabled={!((offset + limit) < operatorCount) || isLoading} onClick={() => {
                                updateOffset(offset + limit);
                            }}>
                                <Chevron />
                            </Button>
                        </div>
                    }
                </div>
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
