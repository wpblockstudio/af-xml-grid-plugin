import {registerBlockType} from '@wordpress/blocks';
import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';

import './style.scss';

const blockClassNames = (attributes, editor = false) => {

    return [
        'af-xml-grid-card af-loop-card',
        editor ? '--editor' : null,
    ].filter(Boolean).join(' ');
};

registerBlockType('af/xml-grid-card', {
    edit: ({attributes}) => {

        const blockProps = useBlockProps({
            className: blockClassNames(attributes,true),
        });

        const innerBlocksProps = useInnerBlocksProps(blockProps, {});

        return (
            <>
                <article {...innerBlocksProps} />
            </>
        );
    },
    save: ({attributes}) => {
        const blockProps = useBlockProps.save({
            className: blockClassNames(attributes, false)
        });

        const innerBlocksProps = useInnerBlocksProps.save(blockProps);

        return <article {...innerBlocksProps}  />;
    }

});
