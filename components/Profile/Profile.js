import { useState, useEffect } from 'react';

import InvestorForm from './InvestorForm';
import OperatorForm from './OperatorForm';
import UserForm from './UserForm';

import styles from './Profile.module.scss';

const Profile = ({
    user,
    profileUser,
    isEditable
}) => {
    const [editData, updateEditData] = useState({});
    const [showEditInvestorForm, updateShowEditInvestorForm] = useState(false);
    const [showEditOperatorForm, updateShowEditOperatorForm] = useState(false);
    const [showUserForm, updateShowUserForm] = useState(false);
    const [userDataToDisplay, updateUserDataToDisplay] = useState(isEditable ? user : profileUser);

    const handleDelete = () => {
        console.log('delete');
    };

    const handleEdit = (data, type) => {
        if (type === 'investor') {
            updateShowEditInvestorForm(true);
            updateShowEditOperatorForm(false);
            updateShowUserForm(false)
        } else if (type === 'operator') {
            updateShowEditInvestorForm(false);
            updateShowEditOperatorForm(true);
            updateShowUserForm(false);
        } else if (type === 'user') {
            updateShowEditInvestorForm(false);
            updateShowEditOperatorForm(false);
            updateShowUserForm(true);
        }

        updateEditData(data);
    };

    const cancelEdit = () => {
        updateShowEditInvestorForm(false);
        updateShowEditOperatorForm(false);
        updateShowUserForm(false);
        updateEditData({});
    }

    if (!userDataToDisplay) {
        return null;
    }

    return (
        <section className={styles['profile-page-wrapper']}>
            <div>
                <img src={userDataToDisplay?.picture} alt={userDataToDisplay?.first_name} />
                <h2>{userDataToDisplay?.first_name} {userDataToDisplay?.last_name}</h2>
                <p>{userDataToDisplay?.email}</p>
                <p>{userDataToDisplay?.preferred_location}</p>
                <p>{userDataToDisplay?.website}</p>
                {isEditable &&
                    <>
                        <button onClick={() => handleEdit(userDataToDisplay, 'user')}>Edit</button>
                        <a href="/api/auth/logout">Logout</a>
                    </>
                }
                <h3>Investor Opportunities ({userDataToDisplay?.investorOpportunities?.length})</h3>
                <button onClick={() => handleEdit({}, 'investor')}>Add Investor Opportunity</button>
                {userDataToDisplay?.investorOpportunities?.map((investor, i) => {
                    return (
                        <div key={`${investor?.id}${i}`}>
                            <p>Looking for {investor?.need}</p>
                            <p>{investor?.investment_amount_min && investor?.investment_amount_max ? `${investor?.investment_amount_min} - ${investor?.investment_amount_max}` : investor?.investment_amount_max} needed</p>
                            <p>{investor?.ideal_operator_description}</p>
                            <p>{investor?.investment_category}</p>
                            <p>{investor?.investment_type}</p>
                            <p>{investor?.investment_timeframe}</p>
                            {isEditable &&
                                <>
                                    <button onClick={() => handleDelete(investor, 'investor')}>Delete</button>
                                    <button onClick={() => handleEdit(investor, 'investor')}>Edit</button>
                                </>
                            }

                        </div>
                    )
                })}
                <h3>Operator Opportunities ({userDataToDisplay?.operatorOpportunities?.length})</h3>
                <button onClick={() => handleEdit({}, 'operator')}>Add Operator Opportunity</button>
                {userDataToDisplay?.operatorOpportunities?.map((operator, i) => {
                    return (
                        <div key={`${operator?.id}${i}`}>
                            <p>Looking for {operator?.need}</p>
                            <p>{operator?.capital_amount_min && operator?.capital_amount_max ? `${operator?.capital_amount_min} - ${operator?.capital_amount_max}` : operator?.capital_amount_max} needed</p>
                            <p>{operator?.ideal_investor_description}</p>
                            <p>{operator?.operating_category}</p>
                            <p>{operator?.investment_type}</p>
                            <p>{operator?.timeframe}</p>
                            {isEditable &&
                                <>
                                    <button onClick={() => handleDelete(operator, 'operator')}>Delete</button>
                                    <button onClick={() => handleEdit(operator, 'operator')}>Edit</button>
                                </>
                            }
                        </div>
                    )
                })}
            </div>
            {showEditInvestorForm &&
                <InvestorForm
                    investorData={editData}
                    onCancel={cancelEdit}
                    updateData={updateEditData}
                    userId={userDataToDisplay?.id}
                    updateUserDataToDisplay={updateUserDataToDisplay}
                />
            }
            {showEditOperatorForm &&
                <OperatorForm
                    operatorData={editData}
                    onCancel={cancelEdit}
                    updateData={updateEditData}
                    userId={userDataToDisplay?.id}
                    updateUserDataToDisplay={updateUserDataToDisplay}
                />
            }
            {showUserForm &&
                <UserForm
                    userData={editData}
                    onCancel={cancelEdit}
                    updateData={updateEditData}
                    updateUserDataToDisplay={updateUserDataToDisplay}
                />
            }
        </section>
    );
}

export default Profile;
