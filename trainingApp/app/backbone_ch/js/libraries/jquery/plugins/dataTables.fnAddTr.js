/*
*   DataTables plugin for adding a row html at an index.
*/
$.fn.dataTableExt.oApi.fnAddTr = function (oSettings, nTr, insertAt) {

    var nTds = $(nTr).find('td');
    if (nTds.length != oSettings.aoColumns.length) {
        console.error( 'Error: not adding new TR - columns and TD elements must match' );
        return;
    }

    if (typeof bRedraw == 'undefined') {
        bRedraw = true;
    }

    var aDataIn = [];
    nTds.each(function() {
        aDataIn.push($(this).html())
    });


    /* Create the object for storing information about this new row */
    var iRow = oSettings.aoData.length;
    var oData = $.extend(true, {}, this.DataTable.models.oRow);
    oData._aData = aDataIn;
    oData.nTr = $(nTr)[0];

    insertAt = insertAt > -1 ? insertAt : iRow;
    oSettings.aoData.splice(insertAt, 0, oData);

    /* Create the cells */
    var nTd, sThisType;
    for (var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++) {
        oCol = oSettings.aoColumns[i];

        /* Use rendered data for filtering / sorting */
        if (typeof oCol.fnRender === 'function' && oCol.bUseRendered && oCol.mData !== null) {
            this.oApi._fnSetCellData( oSettings, iRow, i, this.oApi._fnRender(oSettings, iRow, i) );
        } else {
            this.oApi._fnSetCellData( oSettings, iRow, i, this.oApi._fnGetCellData( oSettings, iRow, i ) );
        }

        /* See if we should auto-detect the column type */
        if (oCol._bAutoType && oCol.sType != 'string') {
            /* Attempt to auto detect the type - same as _fnGatherData() */
            var sVarType = this.oApi._fnGetCellData( oSettings, iRow, i, 'type' );
            if (sVarType !== null && sVarType !== '') {
                sThisType = _fnDetectType( sVarType );
                if (oCol.sType === null) {
                    oCol.sType = sThisType;
                } else if (oCol.sType != sThisType && oCol.sType != "html") {
                    /* String is always the 'fallback' option */
                    oCol.sType = 'string';
                }
            }
        }
    }

    /* Add to the display array */
    oSettings.aiDisplayMaster.push(iRow);
    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

    /* Add the row to the DOM */
    this.oApi._fnDraw(oSettings);
};