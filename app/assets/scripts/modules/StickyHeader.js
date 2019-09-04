import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';



class StickyHeader {

  constructor() {
    this.lazyImages = $(".lazyload");
    this.Header = $(".site-header")
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmothScrolling();
    this.refreshWaypoint();
  }

  refreshWaypoint(){
    this.lazyImages.on('load', function(){
      Waypoint.refreshAll();
    });
  }

  addSmothScrolling(){
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint(){
    var that = this;
    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: function(direction) {
        if (direction == "down"){
          that.Header.addClass("site-header--dark");
        } else {
          that.Header.removeClass("site-header--dark");
        }
      }
    });
  }
  createPageSectionWaypoints() {
    var that = this;
    this.pageSections.each(function(){
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "down"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link")
            $(matchingHeaderLink).addClass("is-current-link")
          }
        },
        offset: "18%"
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "up"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link")
            $(matchingHeaderLink).addClass("is-current-link")
          }
        },
        offset: "-40%"
      });
    });
  }
}

export default StickyHeader;
