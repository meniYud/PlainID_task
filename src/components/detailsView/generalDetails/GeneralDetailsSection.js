import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {addResource} from '../../../service/translation';
import {currentNamespace, intT} from '../locales/namespace';
import SectionHeader from '../common/SectionHeader';
import {ReadOnlyTextArea, TextField} from '../../fields';

const SectionContainer = styled.div`
    width: 60%;
    border-right: 1px solid lightgray;
    padding: 0 12px 5px;
    min-height: 100%;
`;

const FieldsContainer = styled.div`
    margin-top: 6px;
`;

export default class GeneralDetailsSection extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            initCompleted: false
        };
    }

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        const dictionary = await import('../locales/en-US/strings.json');
        addResource({lang: 'en-US', ns: currentNamespace, dictionary: dictionary});
        this.setState({initCompleted: true});
    };

    render() {
        const {initCompleted} = this.state;
        const {resource} = this.props;

        if (!initCompleted)
            return null;
        

        const sectionHeaderProps = {
            headerText: intT('TITLE'),
            subHeaderText: intT('SUB_TITLE')
        };
        const {name, description, resourceType, path} = resource;
        const nameProps = {
            value: name,
            label: intT('FIELD_TITLE_NAME')
        };
        const descriptionProps = {
            value: description,
            label: intT('FIELD_TITLE_DESCRIPTION')
        };
        const resourceTypeProps = {
            value: resourceType,
            label: intT('FIELD_TITLE_RESOURCE_TYPE')
        };
        const pathProps = {
            value: path,
            label: intT('FIELD_TITLE_RESOURCE_PATH')
        };

        return (
            <SectionContainer>
                <SectionHeader {...sectionHeaderProps} />
                <FieldsContainer>
                    <TextField {...nameProps} />
                    <ReadOnlyTextArea {...descriptionProps} />
                    <TextField {...resourceTypeProps} />
                    <TextField {...pathProps} />
                </FieldsContainer>
            </SectionContainer>
        );
    }
}

GeneralDetailsSection.propTypes = {
    resource: PropTypes.object
};
