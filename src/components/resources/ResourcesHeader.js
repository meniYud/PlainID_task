import React from 'react';
import styled from 'styled-components';
import {addResource} from '../../service/translation';
import {currentNamespace, intT} from './locales/namespace';
import {HeaderText, SubHeaderText} from '../../styles/commonStyles';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default class ResourcesHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initCompleted: false,
            resources: [],
            actions: [],
            selectedResourceId: ''
        }
    }

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        const dictionary = await import('./locales/en-US/strings.json');
        addResource({lang: 'en-US', ns: currentNamespace, dictionary: dictionary});
        this.setState({initCompleted: true});
    };


    render() {
        const {initCompleted} = this.state;

        if (!initCompleted)
            return null;

        return (
            <>
                <ResourceHeaderText>{intT('TITLE')}</ResourceHeaderText>
                <SubHeaderText>{intT('SUBTITLE')}</SubHeaderText>
            </>
        );
    }
}
