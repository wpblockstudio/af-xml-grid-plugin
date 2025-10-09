import {registerBlockType} from '@wordpress/blocks';
import {InspectorControls, useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';
import {useCallback, useMemo} from "@wordpress/element";

import {
    __experimentalGrid as Grid,
    __experimentalNumberControl as NumberControl,
    PanelBody,
    SelectControl, TextControl,
    ToggleControl,
} from "@wordpress/components";
import {isEqual} from 'lodash';

import './style.scss';

const blockClassNames = (attributes, editor = true) => {
    const {settings = {}} = attributes;

    return [
        'af-xml-grid-content',
        settings?.type ? '--type-' + settings?.type : null,
        settings?.fullWidth ? '--full-width' : null,
        settings?.lineClamp ? '--line-clamp' : null,
    ].filter(Boolean).join(' ');
};

const getBlockStyles = (settings) => {

    return Object.fromEntries(Object.entries({
        '--line-clamp': settings?.lineClamp || null,
        flexGrow: !!settings?.['grow'] ? '1' : null,
    }).filter(Boolean));

};

const TYPE_OPTIONS = [
    { label: 'Select', value: '' },
    { label: 'Title', value: 'title' },
    { label: 'Author', value: 'creator' },
    { label: 'Date', value: 'pubDate' },
    { label: 'Description', value: 'description' },
    { label: 'Content', value: 'content' },
    { label: 'Image', value: 'thumbnail' },
    { label: 'Category', value: 'category' },
];


registerBlockType('af/xml-grid-content', {
    edit: ({attributes, setAttributes}) => {

        const {settings = {}} = attributes;
        const {type, lineClamp, grow, link, label, fullWidth} = settings;

        const blockStyles = useMemo(() => getBlockStyles(settings), [settings]);

        const blockProps = useBlockProps({
            className: blockClassNames(attributes),
            style: blockStyles
        });

        const updateSettings = useCallback(
            (newValue = {}) => {

                const newSettings = {...settings, ...newValue};

                // Only set if something actually changed
                if (!isEqual(settings, newSettings)) {
                    setAttributes({settings: newSettings});
                }
            },
            [settings, setAttributes]
        );

        return (
            <>
                <InspectorControls>
                    <PanelBody initialOpen={true}>
                        <Grid columns={1} columnGap={10} rowGap={20}>
                            <SelectControl
                                key={'type'}
                                label="Type"
                                value={type}
                                onChange={(newValue) => updateSettings({type: newValue})}
                                options={TYPE_OPTIONS}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                            {type === 'link' ? <TextControl
                                key="label"
                                label="Label"
                                value={label}
                                onChange={(newValue) => updateSettings({label: newValue})}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            /> : null}
                            <Grid columns={2} columnGap={10} rowGap={10}>

                                <NumberControl
                                    key={'lineClamp'}
                                    label="Line Clamp"
                                    value={lineClamp}
                                    onChange={(newValue) => updateSettings({lineClamp: newValue})}
                                    min={2}
                                    max={12}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                            </Grid>
                            <Grid columns={2} columnGap={10} rowGap={10}>

                                <ToggleControl
                                    key={'link'}
                                    label="Link"
                                    checked={!!link}
                                    onChange={(newValue) => updateSettings({link: newValue})}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    key={'fullWidth'}
                                    label="Full Width"
                                    checked={!!fullWidth}
                                    onChange={(newValue) => updateSettings({fullWidth: newValue})}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    key={'grow'}
                                    label="Grow"
                                    checked={!!grow}
                                    onChange={(newValue) => updateSettings({grow: newValue})}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />

                            </Grid>

                        </Grid>
                    </PanelBody>
                </InspectorControls>
                <span {...blockProps} >{label || TYPE_OPTIONS.find(item => item?.value === type)?.label || 'Card Content'}</span>
            </>
        );
    },
    save: ({ attributes }) => {
        const { settings = {} } = attributes;

        const type = settings.type || 'description';
        const blockProps = useBlockProps.save({
            className: blockClassNames(attributes),
            style: getBlockStyles(settings)
        });

        // Case 1: Image
        if (type === 'thumbnail' || type === 'image') {
            if (settings.link) {
                return (
                    <a
                        {...blockProps}
                        data-wp-bind--href={'context.item.link'}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                    >
                        <img
                            data-wp-bind--width={'context.imageSize'}
                            data-wp-bind--src={'context.item.thumbnail'}
                            alt=""
                        />
                    </a>
                );
            }
            return (
                <img
                    {...blockProps}
                    data-wp-bind--width={'context.imageSize'}
                    data-wp-bind--src={'context.item.thumbnail'}
                    alt=""
                />
            );
        }

        const contentKey = `context.item.${type}`;

        // Case 2: Linked text
        if (settings.link) {
            return (
                <a
                    {...blockProps}
                    data-wp-text={contentKey}
                    data-wp-bind--href={'context.item.link'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                ></a>
            );
        }

        // Case 3: Plain text
        return <div {...blockProps} data-wp-text={contentKey}></div>;
    }




});
