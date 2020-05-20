import React from 'react'
import './collection-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component';
import {createStructuredSelector} from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux'

function CollectionOverview({collections}) {
    return (
        <div className='collection-overview'>
            {
                    collections.map(({id, ...otherCollectionProps})=>{
                        return <CollectionPreview key={id} {...otherCollectionProps} />
                    })
                }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview)
