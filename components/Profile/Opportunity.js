import Link from 'next/link';
import Image from 'next/image';
import { GrTrash } from 'react-icons/gr';

import Button from '../Common/Button';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';
import LocationIcon from '../SVG/LocationIcon';

import styles from './Opportunity.module.scss';

const Opportunity = ({
    handleDelete,
    handleEdit,
    isEditable,
    opportunity,
    type,
    singleOpportunity
}) => {
    if (!opportunity) {
        return null;
    }

    return (
        <div className={`${styles['opportunity-container']} ${singleOpportunity ? styles.single : ''}`.trim()}>
            {type === 'investor' &&
                <div className={styles['opportunity-container-inner']}>
                    {opportunity?.need &&
                        <div className={styles.row}>
                            <h4>Need</h4>
                            <p className={styles['inner-text']}>{opportunity?.need}</p>
                        </div>
                    }
                    {opportunity?.investment_amount_max &&
                        <div className={styles.row}>
                            <h4>Investment Amount</h4>
                            <p className={styles['inner-text']}>{opportunity?.investment_amount_min && opportunity?.investment_amount_max ? `$${Number(opportunity?.investment_amount_min)?.toLocaleString()} - $${Number(opportunity?.investment_amount_max)?.toLocaleString()}` : `$${Number(opportunity?.investment_amount_max)?.toLocaleString()}`}</p>
                        </div>
                    }
                    {opportunity?.investment_category &&
                        <div className={styles.row}>
                            <h4>Category</h4>
                            <p className={styles['inner-text']}>{opportunity?.investment_category}</p>
                        </div>
                    }
                    {opportunity?.investment_type &&
                        <div className={styles.row}>
                            <h4>Investment Type</h4>
                            <p className={styles['inner-text']}>{opportunity?.investment_type}</p>
                        </div>
                    }
                    {opportunity?.preferred_location &&
                        <div className={styles.row}>
                            <h4>Preferred Location</h4>
                            <p className={styles['inner-text']}>{opportunity?.preferred_location}, US</p>
                        </div>
                    }
                    {opportunity?.investment_timeframe &&
                        <div className={styles.row}>
                            <h4>Investment Timeframe</h4>
                            <p className={styles['inner-text']}>{opportunity?.investment_timeframe}</p>
                        </div>
                    }
                    {opportunity?.ideal_operator_description &&
                        <div className={styles.row}>
                            <h4>Describe your ideal operator</h4>
                            <p className={styles['inner-text']}>{opportunity?.ideal_operator_description}</p>
                        </div>
                    }
                </div>
            }
            {type === 'operator' &&
                <div className={styles['opportunity-container-inner']}>
                    {opportunity?.need &&
                        <div className={styles.row}>
                            <h4>Need</h4>
                            <p className={styles['inner-text']}>{opportunity?.need}</p>
                        </div>
                    }
                    {opportunity?.capital_amount_max &&
                        <div className={styles.row}>
                            <h4>Capital Amount</h4>
                            <p className={styles['inner-text']}>{opportunity?.capital_amount_min && opportunity?.capital_amount_max ? `$${Number(opportunity?.capital_amount_min)?.toLocaleString()} - $${Number(opportunity?.capital_amount_max)?.toLocaleString()}` : `$${Number(opportunity?.capital_amount_max)?.toLocaleString()}`}</p>
                        </div>
                    }
                    {opportunity?.operating_category &&
                        <div className={styles.row}>
                            <h4>Category</h4>
                            <p className={styles['inner-text']}>{opportunity?.operating_category}</p>
                        </div>
                    }
                    {opportunity?.investment_type &&
                        <div className={styles.row}>
                            <h4>Investment Type</h4>
                            <p className={styles['inner-text']}>{opportunity?.investment_type}</p>
                        </div>
                    }
                    {opportunity?.preferred_location &&
                        <div className={styles.row}>
                            <h4>Preferred Location</h4>
                            <p className={styles['inner-text']}>{opportunity?.preferred_location}</p>
                        </div>
                    }
                    {opportunity?.timeframe &&
                        <div className={styles.row}>
                            <h4>Timeframe</h4>
                            <p className={styles['inner-text']}>{opportunity?.timeframe}</p>
                        </div>
                    }
                    {opportunity?.ideal_investor_description &&
                        <div className={styles.row}>
                            <h4>Describe your ideal investor</h4>
                            <p className={styles['inner-text']}>{opportunity?.ideal_investor_description}</p>
                        </div>
                    }
                </div>
            }
            {isEditable &&
                <div className={styles['opportunity-action-buttons']}>
                    <Button size="xs" onClick={() => handleDelete(opportunity, type)}>Delete</Button>
                    <Button size="xs" onClick={() => handleEdit(opportunity, type)}>Edit</Button>
                </div>
            }
        </div>
    )
}

export default Opportunity;
