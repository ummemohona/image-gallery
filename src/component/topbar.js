import React from 'react';
import "../styles/topBar.css";
import {Button, Space} from 'antd';

const TopBar = ({selectedImageCount, onDeleteSelected, show}) => {
    const filePlural = selectedImageCount < 2 ? 'File' : 'Files';
    if (!show) {
        return null;
    }

    return (
        <div className={`navbar ${show ? 'visible' : ''}`}>
            <div className="selected-count">
                {selectedImageCount} {filePlural} Selected
            </div>
            <div className="actions">
                <Space>
                    <Button type="text" danger onClick={onDeleteSelected}>
                        Delete {filePlural}
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default TopBar;
