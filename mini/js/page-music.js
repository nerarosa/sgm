var dblisturl = "https://sgmmusic-list.blogspot.com";

FWDRAPUtils.onReady(function(){		
    var listJsonUrl = dblisturl + "/feeds/posts/default/5175081066803936309?alt=json-in-script";
    
    $.ajax({
        type: 'get',
        url: listJsonUrl,
        cache: false,
        dataType: 'jsonp',
        success: function(data){
            var pListThumb, pListTitle, pListType, pListDes, pListContent,
            entry=data.entry;

            if (entry !== undefined) {			
                pListTitle = entry.title.$t;			
                                    
                var content = "content" in entry ? entry.content.$t : "";
                pListDes = content.substring(content.indexOf("[playlistDes]")+13, content.indexOf("[/playlistDes]"));
                pListThumb = content.substring(content.indexOf("[playlistThumb]")+15, content.indexOf("[/playlistThumb]"));
                
                pListContent = content.substring(content.indexOf("[playlistCon]")+13, content.indexOf("[/playlistCon]"));
                
                $("#playlist1").html(pListContent);
                $("#now-playing-title .playlist-title h3").text(pListTitle);
                
                new FWDRAP({
                    //main settings
                    instanceName:"player1",
                    parentId:"sgm-audio-player",
                    playlistsId:"playlists",
                    mainFolderPath:"http://showsexygirl.zz.mu/sgmmusic/content",
                    skinPath:"minimal_skin_dark",
                    facebookAppId:"530564293649326",//required only if the facebook share button is used
                    showSoundCloudUserNameInTitle:"yes",
                    useDeepLinking:"yes",
                    rightClickContextMenu:"default",
                    showButtonsToolTips:"yes",
                    autoPlay:"yes",
                    loop:"no",
                    shuffle:"no",
                    maxWidth:801,
                    volume:1,
                    toolTipsButtonsHideDelay:1.5,
                    toolTipsButtonFontColor:"#5a5a5a",
                    //controller settings
                    animateOnIntro:"yes",
                    showThumbnail:"yes",
                    showSoundAnimation:"yes",
                    showLoopButton:"yes",
                    showShuffleButton:"yes",
                    showDownloadMp3Button:"yes",
                    showBuyButton:"yes",
                    showFacebookButton:"no",
                    expandBackground:"no",
                    titleColor:"#FFFFFF",
                    timeColor:"#888888",
                    //controller align and size settings (described in detail in the documentation!)
                    controllerHeight:76,
                    startSpaceBetweenButtons:9,
                    spaceBetweenButtons:8,
                    separatorOffsetOutSpace:5,
                    separatorOffsetInSpace:9,
                    lastButtonsOffsetTop:14,
                    allButtonsOffsetTopAndBottom:14,
                    titleBarOffsetTop:13,
                    mainScrubberOffsetTop:47,
                    spaceBetweenMainScrubberAndTime:10,
                    startTimeSpace:10,
                    scrubbersOffsetWidth:2,
                    scrubbersOffestTotalWidth:0,
                    volumeButtonAndScrubberOffsetTop:47,
                    spaceBetweenVolumeButtonAndScrubber:6,
                    volumeScrubberOffestWidth:4,
                    scrubberOffsetBottom:10,
                    equlizerOffsetLeft:1,
                    //playlists window settings
                    showPlaylistsButtonAndPlaylists:"yes",
                    showPlaylistsByDefault:"no",
                    thumbnailSelectedType:"opacity",
                    startAtPlaylist:0,
                    startAtTrack:0,
                    buttonsMargins:0,
                    thumbnailMaxWidth:330, 
                    thumbnailMaxHeight:330,
                    horizontalSpaceBetweenThumbnails:40,
                    verticalSpaceBetweenThumbnails:40,
                    //playlist settings
                    showPlayListButtonAndPlaylist:"yes",
                    showPlayListOnAndroid:"yes",
                    showPlayListByDefault:"no",
                    showPlaylistItemPlayButton:"yes",
                    showPlaylistItemDownloadButton:"yes",
                    showPlaylistItemBuyButton:"yes",
                    forceDisableDownloadButtonForPodcast:"yes",
                    forceDisableDownloadButtonForOfficialFM:"yes",
                    forceDisableDownloadButtonForFolder:"yes",
                    addScrollBarMouseWheelSupport:"yes",
                    showTracksNumbers:"yes",
                    playlistBackgroundColor:"#000000",
                    trackTitleNormalColor:"#888888",
                    trackTitleSelectedColor:"#FFFFFF",
                    trackDurationColor:"#888888",
                    maxPlaylistItems:100,
                    nrOfVisiblePlaylistItems:12,
                    trackTitleOffsetLeft:0,
                    playPauseButtonOffsetLeftAndRight:11,
                    durationOffsetRight:9,
                    downloadButtonOffsetRight:11,
                    scrollbarOffestWidth:7,
                    //search bar settings
                    showSearchBar:"yes",
                    showSortButtons:"yes",
                    searchInputColor:"#999999",
                    searchBarHeight:38,
                    inputSearchTextOffsetTop:1,
                    inputSearchOffsetLeft:0,
                    //popup settings
                    showPopupButton:"no",
                    popupWindowBackgroundColor:"#878787",
                    popupWindowWidth:750,
                    popupWindowHeight:391
                });
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
        
});
        
function buyCustomFunction(){
    alert("The buy button can open a custom link or a custom javascript function.");
}
    
FWDRLUtils.onReady(function(){
    var urlfeed = '/feeds/posts/default/-/Photo?alt=json-in-script&orderby=updated&max-results=55';
    $.ajax({
        url: urlfeed,
        type: 'get',
        async: true,
        dataType: "jsonp",
        success: function(data) {
            var posturl, posttitle, postimg, sliderHtml = '',
                entry = data.feed.entry;
            if (entry !== undefined) {					
                for (var i = 0; i < entry.length; i++) {
                    for (var j=0; j < entry[i].link.length; j++){
                        if (entry[i].link[j].rel == "alternate"){
                            posturl = entry[i].link[j].href;
                            break;
                        }
                    }                
                    posttitle = entry[i].title.$t;
                    if ("media$thumbnail" in entry[i]) {
                        postimg = entry[i].media$thumbnail.url;
                        postimg = postimg.replace('/s72-c','/w308-h266-c');
                    } else {
                        postimg = "http://placehold.it/308x266&amp;text=No+Image"
                    }
                    sliderHtml += '<li data-thumbnail-path="'+ postimg +'" data-url="link:'+ posturl +'" data-target="_blank"><div><p class="gallery1DecHeader">'+ posttitle +'</p><p class="gallery1DescP">Click to view details</p></div></li>';
                }
                $('#sgmPlaylist').html('<ul data-category-name="All Sexy">'+sliderHtml+'</ul>');
                
                new FWDIGP({
        //main settings 
        rightClickContextMenu:"default",
        instanceName:"myIGP",
        parentId:"grid-sgm-post",
        mainFolderPath:"http://showsexygirl.zz.mu/sgmmusic/content",
        skinPath:"modern-skin",
        playlistId:"sgmPlaylist",
        displayType:"fluidwidth",
        dragDirection:"both",
        autoScrollDirection:"left",
        thumbnailTransitionType:"opacity",
        allCategoriesLabel:"All Categories (mixed)",
        showAllCategories:"yes",
        autoScale:"yes",
        autoScroll:"no",
        enableVisitedThumbnails:"no",
        addZoomSupport:"yes",
        addDragAndSwipeSupport:"yes",
        disableThumbnailInteractivity:"no",
        randomizeAllCategories:"yes",
        randomizeCategories:"no",
        showThumbnailOverlay:"yes",
        showThumbnailIcon:"yes",
        showHelpScreen:"no",
        startAtCategory:1,
        maxWidth:940,
        maxHeight:600,
        thumbnailMaxWidth:210,
        thumbnailMaxHeight:190,
        maxScale:1.6,
        minScale:.8,
        autoScrollSpeed:0,
        thumbnailOverlayOpacity:.7,
        helpScreenOpacity:.3,
        backgroundColor:"#000000",
        thumbnailBackgroundColor:"#111111",
        thumbnailOverlayColor:"#000000",
        helpScreenBackgroundColor:"#FFFFFF",
        //combobox settings
        selectLabel:"SELECT CATEGORIES",
        comboBoxPosition:"topRight",
        showComboBox:"no",
        comboBoxHorizontalMargins:12,
        comboBoxVerticalMargins:12,
        comboBoxCornerRadius:3,
        selctorBackgroundNormalColor:"#FFFFFF",
        selctorBackgroundSelectedColor:"#000000",
        selctorTextNormalColor:"#000000",
        selctorTextSelectedColor:"#FFFFFF",
        buttonBackgroundNormalColor:"#FFFFFF",
        buttonBackgroundSelectedColor:"#000000",
        buttonTextNormalColor:"#000000",
        buttonTextSelectedColor:"#FFFFFF",
        comboBoxShadowColor:"#000000",
        //ligtbox settings (optional)
        facebookAppId:"213684265480896",
        buttonsAlignment:"in",
        itemBoxShadow:"none",
        descriptionWindowAnimationType:"motion",
        descriptionWindowPosition:"bottom",
        slideShowAutoPlay:"no",
        addKeyboardSupport:"yes",
        showCloseButton:"yes",
        showFacebookButton:"yes",
        showZoomButton:"yes",
        showSlideShowButton:"yes",
        showSlideShowAnimation:"yes",
        showNextAndPrevButtons:"yes",
        showNextAndPrevButtonsOnMobile:"yes",
        showDescriptionButton:"yes",
        showDescriptionByDefault:"no",
        videoShowFullScreenButton:"yes",
        videoAutoPlay:"no",
        nextVideoOrAudioAutoPlay:"yes",
        videoLoop:"no",
        audioAutoPlay:"no",
        audioLoop:"no",
        backgroundOpacity:.9,
        descriptionWindowBackgroundOpacity:.95,
        buttonsHideDelay:3,
        slideShowDelay:4,
        defaultItemWidth:640,
        defaultItemHeight:480,
        itemOffsetHeight:50,
        spaceBetweenButtons:8,
        buttonsOffsetIn:5,
        buttonsOffsetOut:5,
        itemBorderSize:0,
        itemBorderRadius:0,
        itemBackgroundColor:"#333333",
        itemBorderColor:"#333333",
        lightBoxBackgroundColor:"#000000",
        descriptionWindowBackgroundColor:"#FFFFFF",
        videoPosterBackgroundColor:"#0099FF",
        videoControllerBackgroundColor:"#FFFFFF",
        audioControllerBackgroundColor:"#FFFFFF",
        timeColor:"#000000"
    });	
            } else {
                $('#sgmPlaylist').html('<span>No result!</span>');
            }
        },
        error: function() {
            $('#sgmPlaylist').html('<strong>Error Loading Feed!</strong>');
        }
    });
});

