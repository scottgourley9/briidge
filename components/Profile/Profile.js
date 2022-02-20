import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import scrollIntoView from 'scroll-into-view';
import {
    GrAdd,
    GrFormPrevious
} from 'react-icons/gr';

import { useDeleteInvestor } from './hooks/useDeleteInvestor';
import { useDeleteOperator } from './hooks/useDeleteOperator';
import { useGetUserData } from './hooks/useGetUserData';

import InvestorForm from './InvestorForm';
import OperatorForm from './OperatorForm';
import UserForm from './UserForm';
import ConnectModal from '../ConnectModal';
import User from './User';
import Opportunity from './Opportunity';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import Alert from '../Common/Alert';

import styles from './Profile.module.scss';

const Profile = ({
    user,
    profileUser,
    isEditable,
    referer
}) => {
    const router = useRouter();

    const investorTitle = useRef();
    const operatorTitle = useRef();
    const firstInvestor = useRef();
    const firstOperator = useRef();

    const [editData, updateEditData] = useState({});
    const [showEditInvestorForm, updateShowEditInvestorForm] = useState(false);
    const [showEditOperatorForm, updateShowEditOperatorForm] = useState(false);
    const [showUserForm, updateShowUserForm] = useState(false);
    const [userDataToDisplay, updateUserDataToDisplay] = useState(isEditable ? user : profileUser);
    const [selectedConnect, updateSelectedConnect] = useState({});
    const [showModal, updateShowModal] = useState(false);
    const [isMounted, updatedIsMounted] = useState(false);
    const [showConfirmDelete, updateShowConfirmDelete] = useState(false);
    const [deletionData, updateDeletionData] = useState({});

    const { onDeleteInvestor, isLoading: deleteInvestorIsLoading, data: deleteInvestorData, isSuccess: deleteInvestorSuccess, isError: deleteInvestorError } = useDeleteInvestor();
    const { onDeleteOperator, isLoading: deleteOperatorIsLoading, data: deleteOperatorData, isSuccess: deleteOperatorSuccess, isError: deleteOperatorError } = useDeleteOperator();
    const { onGetUserData, isLoading: getUserIsLoading, data: getUserData, isSuccess: getUserSuccess, isError: getUserError } = useGetUserData();

    useEffect(() => {
        updatedIsMounted(true);
    }, []);

    useEffect(() => {
        if (deleteInvestorSuccess || deleteOperatorSuccess) {
            onGetUserData({ userId: user?.id });
        }
    }, [deleteInvestorSuccess, deleteOperatorSuccess]);

    useEffect(() => {
        if (getUserSuccess) {
            updateUserDataToDisplay(getUserData?.data);
        }
    }, [getUserSuccess]);

    const handleDelete = (data, type) => {
        updateShowConfirmDelete(true);
        updateDeletionData({
            ...data,
            type
        });
    };

    const handleDeleteConfirm = () => {
        updateShowConfirmDelete(false);

        const {
            type,
            user_id,
            id
        } = deletionData || {};

        if (type === 'investor') {
            onDeleteInvestor({
                userId: user_id,
                investorId: id
            });
        } else if (type === 'operator') {
            onDeleteOperator({
                userId: user_id,
                investorId: id
            });
        }
    }

    const handleEdit = (data, type) => {
        if (!Object.keys(data || {})?.length) {
            updateEditData({});
        }
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

    const handleConnectClick = operator => {
        updateSelectedConnect(operator);
        updateShowModal(true);
    }

    if (!userDataToDisplay) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    referer ? router.back() : router.push('/');
                }}
                className={styles['back-svg-container']}
            >
                <GrFormPrevious className={styles['back-chevron']} /> Back
            </button>
            <section className={styles['profile-page-wrapper']}>
                {false &&
                    <Alert
                        size="sm"
                        type="info"
                        title="Complete your profile"
                    >
                        Please fill out the required fields
                    </Alert>
                }
                <User
                    user={userDataToDisplay}
                    handleConnectClick={handleConnectClick}
                    isEditable={isEditable}
                    handleEdit={handleEdit}
                    onGetUserData={onGetUserData}
                    getUserSuccess={getUserSuccess}
                    getUserError={getUserError}
                >
                    <InvestorForm
                        investorData={editData}
                        onCancel={cancelEdit}
                        updateData={updateEditData}
                        userId={userDataToDisplay?.id}
                        updateUserDataToDisplay={updateUserDataToDisplay}
                        updateShowEditInvestorForm={updateShowEditInvestorForm}
                        showEditInvestorForm={showEditInvestorForm}
                    />
                    <OperatorForm
                        operatorData={editData}
                        onCancel={cancelEdit}
                        updateData={updateEditData}
                        userId={userDataToDisplay?.id}
                        updateUserDataToDisplay={updateUserDataToDisplay}
                        updateShowEditOperatorForm={updateShowEditOperatorForm}
                        showEditOperatorForm={showEditOperatorForm}
                    />
                    <UserForm
                        userData={editData}
                        onCancel={cancelEdit}
                        updateData={updateEditData}
                        updateUserDataToDisplay={updateUserDataToDisplay}
                        updateShowUserForm={updateShowUserForm}
                        showUserForm={showUserForm}
                    />
                    {(userDataToDisplay?.investorOpportunities?.length > 0 || isEditable) &&
                        <>
                            <div className={styles['opportunity-title']}>
                                <h3 ref={investorTitle}>Investor Opportunities&nbsp;
                                    {(userDataToDisplay?.investorOpportunities?.length > 1 || userDataToDisplay?.operatorOpportunities?.length > 0) &&
                                        <span>({userDataToDisplay?.investorOpportunities?.length})</span>
                                    }
                                </h3>
                                {isEditable &&
                                    <GrAdd className={styles['plus-container']} onClick={() => handleEdit({}, 'investor')} />
                                }
                            </div>
                            <div className={styles['opportunities-wrapper']}>
                                {userDataToDisplay?.investorOpportunities?.map((investor, i) => (
                                    <div ref={i ? null : firstInvestor} key={`${investor?.id}${i}`} className={styles['opportunity-wrapper']}>
                                        <Opportunity
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                            isEditable={isEditable}
                                            opportunity={investor}
                                            type="investor"
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                    {(userDataToDisplay?.operatorOpportunities?.length > 0 || isEditable) &&
                        <>
                            <div className={styles['opportunity-title']}>
                                <h3 ref={operatorTitle}>Operator Opportunities&nbsp;
                                    {(userDataToDisplay?.operatorOpportunities?.length > 1 || userDataToDisplay?.investorOpportunities?.length > 0) &&
                                        <span>({userDataToDisplay?.operatorOpportunities?.length})</span>
                                    }
                                </h3>
                                {isEditable &&
                                    <GrAdd className={styles['plus-container']} onClick={() => handleEdit({}, 'operator')} />
                                }
                            </div>
                            <div className={styles['opportunities-wrapper']}>
                                {userDataToDisplay?.operatorOpportunities?.map((operator, i) => (
                                    <div ref={i ? null : firstOperator} key={`${operator?.id}${i}`} className={styles['opportunity-wrapper']}>
                                        <Opportunity
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                            isEditable={isEditable}
                                            opportunity={operator}
                                            type="operator"
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </User>
                {!isEditable &&
                    <ConnectModal
                        updateShowModal={updateShowModal}
                        showModal={showModal}
                        updateSelectedConnect={updateSelectedConnect}
                        selectedConnect={selectedConnect}
                        user={user}
                    />
                }
                <Modal
                    onClose={() => {
                        updateShowConfirmDelete(false);
                    }}
                    isOpen={showConfirmDelete}
                    title="Confirm Delete"
                    footer={
                        <div className={`${styles.row} ${styles['form-save-cancel-buttons']}`.trim()}>
                            <Button size="sm" onClick={() => updateShowConfirmDelete(false)}>Cancel</Button>
                            <Button size="sm" selected={true} onClick={handleDeleteConfirm}>Yes, Delete</Button>
                        </div>
                    }
                >
                    Are you sure you want to delete this opportunity? This action can not be undone.
                </Modal>
            </section>
        </>
    );
}

export default Profile;
