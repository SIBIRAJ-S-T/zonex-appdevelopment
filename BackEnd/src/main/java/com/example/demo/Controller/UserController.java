package com.example.demo.Controller;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.Auction;
import com.example.demo.Entity.Bid;
import com.example.demo.Entity.ChatMessage;
import com.example.demo.Entity.CurrentUser;
import com.example.demo.Entity.LoginHistory;
import com.example.demo.Entity.LogoutHistory;
import com.example.demo.Entity.PhoneNumber;
import com.example.demo.Entity.ShowUser;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Entity.YourApp;
import com.example.demo.Service.UserService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {
	@Autowired
    UserService service;
	
    @PostMapping("/users")
    public UserEntity createUser(@RequestBody UserEntity user) {
    	user.setRegistrationDate(LocalDate.now());
    	user.setRegistrationTime(LocalTime.now());
        return service.saveUser(user);
    }
    
    @Transactional
    @GetMapping("/get/{username}/{password}")
    public String get_By_Id(@PathVariable String username ,@PathVariable String password ) {
    	return service.get_By_Id(username,password);
    }
    
    @Transactional
    @DeleteMapping("/deletename/{username}/{password}")
	public String deleteNameData(@PathVariable String username, @PathVariable String password){
		return service.deleteByName(username, password);
	}
    
    @Transactional
    @DeleteMapping("/deletenameshowuser/{username}")
	public String deleteNameShowUserData(@PathVariable String username){
		return service.deleteByShowUserName(username);
	}
    
    @Transactional
    @PutMapping("/updatePassword/{username}/{oldPassword}/{newPassword}")
    public String updatePassword(@PathVariable String username, @PathVariable String oldPassword, @PathVariable String newPassword) {
        return service.updatePassword(username, oldPassword, newPassword);
    }
    
    @GetMapping("/checkUsername/{username}")
    public boolean checkUsernameExists(@PathVariable String username) {
        return service.checkUsernameExists(username);
    }
    
    @PostMapping("/loginhistory")
    public LoginHistory loginUserHistory(@RequestBody LoginHistory user) {
    	user.setRegistrationDate(LocalDate.now());
    	user.setRegistrationTime(LocalTime.now());
        return service.saveLoginHistory(user);
    }
    
    @PostMapping("/logouthistory")
    public LogoutHistory logoutUserHistory(@RequestBody LogoutHistory user) {
    	user.setRegistrationDate(LocalDate.now());
    	user.setRegistrationTime(LocalTime.now());
    	return service.saveLogoutHistory(user);
    }
    
    @PostMapping("/currentuserinsert")
    public CurrentUser currentUserInsert(@RequestBody CurrentUser user) {
    	user.setLoginTime(LocalDateTime.now());
        return service.saveCurrentUser(user);
    }
    
    @Transactional
    @DeleteMapping("/logout/{username}")
    public String logout(@PathVariable String username) {
        return service.logout(username);
    }
    
 // Schedule the deletion of inactive users every 15 minutes
    public void deleteInactiveUsers() {
        service.deleteInactiveUsers();
    }
    
    
    //live user count
    @GetMapping("/liveusers/count")
    public Long getUserCount() {
        return service.getUserCount();
    }
    
    
    //live user already logged in
    @GetMapping("/checkLiveUsername/{username}")
    public boolean checkLiveUsernameExists(@PathVariable String username) {
        return service.checkLiveUsernameExists(username);
    }
    
    
    //show users Entity
    @PostMapping("/showusers")
    public ShowUser createShowUser(@RequestBody ShowUser user) {
        return service.saveShowUser(user);
    }
    
    @GetMapping("/getuser/{username}")
    public ShowUser getUserByUsername(@PathVariable String username) {
        return service.getUserByUsername(username);
    }
    
    
//    @PostMapping("/yourapp")
//    public YourApp yourApp(@RequestBody YourApp yourapp) {
//    	yourapp.setRegistrationDate(LocalDate.now());
//    	yourapp.setRegistrationTime(LocalTime.now());
//        return service.saveApp(yourapp);
//    }
    
    @PostMapping("api/yourapp")
    public YourApp yourApp(@RequestPart("yourapp") YourApp yourapp, @RequestPart("appicon") MultipartFile appicon) throws IOException {
        yourapp.setRegistrationDate(LocalDate.now());
        yourapp.setRegistrationTime(LocalTime.now());
        return service.saveApp(yourapp, appicon);
    }
    
    
//    @GetMapping("/api/yourapp")
//    public List<YourApp> getAllYourApps() {
//        return service.getAllYourApps();
//    }
    
    @GetMapping("api/yourapp")
    public List<YourApp> getAllYourApps() {
        return service.getAllYourApps();
    }
    
    @GetMapping("/yourapp/{id}/appicon")
    public ResponseEntity<byte[]> getAppIcon(@PathVariable Long id) {
        YourApp yourApp = service.getAppById(id); // Assume you have a method to fetch the app by ID
        if (yourApp != null && yourApp.getAppicon() != null) {
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/jpeg"))
                .body(yourApp.getAppicon());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/checkappurl/{appurl}")
    public ResponseEntity<?> checkAppUrlExists(@PathVariable String appurl) {
    	boolean exists =service.checkAppUrlExists(appurl);
    	return ResponseEntity.ok(exists);
    }
    
    @DeleteMapping("deletemyproduct/{id}")
    public void deleteYourApp(@PathVariable Long id) {
        service.deleteYourApp(id);
    }


    @PutMapping("/updatemyproduct/{id}")
    public YourApp updateYourApp(@PathVariable Long id,
                                 @RequestParam("appurl") String appurl,
                                 @RequestParam("appname") String appname,
                                 @RequestParam("price") String price,
                                 @RequestParam("district") String district,
                                 @RequestParam("state") String state,
                                 @RequestParam("pincode") String pincode,
                                 @RequestParam("owner") String owner,
                                 @RequestParam("contact") String contact,
                                 @RequestParam("address") String address,
                                 @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        YourApp updatedApp = new YourApp();
        updatedApp.setAppurl(appurl);
        updatedApp.setAppname(appname);
        updatedApp.setPrice(price);
        updatedApp.setDistrict(district);
        updatedApp.setState(state);
        updatedApp.setPincode(pincode);
        updatedApp.setOwner(owner);
        updatedApp.setContact(contact);
        updatedApp.setAddress(address);

        byte[] imageBytes = null;
        if (image != null && !image.isEmpty()) {
            imageBytes = image.getBytes();
        }

        return service.updateYourApp(id, updatedApp, imageBytes);
    }

    
    @GetMapping("/getmessages")
    public List<ChatMessage> getAllMessages() {
        return service.getAllMessages();
    }

    @PostMapping("/postmessages")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return service.saveMessage(message);
    }
    
    /////////////////

    @GetMapping("api/auctions")
    public List<Auction> getAllAuctions() {
        return service.getAllAuctions();
    }

    @GetMapping("api/auctions/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        byte[] image = service.getImageById(id);
        if (image != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE);
            return new ResponseEntity<>(image, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/auctions/{id}")
    public Auction getAuctionById(@PathVariable Long id) {
        return service.getAuctionById(id);
    }

    @PostMapping("api/auctions")
    public Auction createAuction(@RequestPart("auction") Auction auction, @RequestPart("image") MultipartFile image) throws IOException {
        return service.saveAuction(auction, image);
    }

    @PostMapping("api/auctions/{id}/bid")
    public Bid placeBid(@PathVariable Long id, @RequestBody Bid bid) {
        bid.setAuctionId(id);
        return service.saveBid(bid);
    }

    @GetMapping("api/auctions/{id}/bids")
    public List<Bid> getBidsByAuctionId(@PathVariable Long id) {
        return service.getBidsByAuctionId(id);
    }

    @GetMapping("api/auctions/{id}/highestBid")
    public Bid getHighestBid(@PathVariable Long id) {
        return service.getHighestBid(id);
    }

    @GetMapping("api/auctions/{id}/winner")
    public String getWinner(@PathVariable Long id) {
        return service.getWinner(id);
    }
    
    @PostMapping("api/phone")
    public ResponseEntity<PhoneNumber> addPhoneNumber(@RequestBody PhoneNumber phoneNumber) {
        PhoneNumber savedPhoneNumber = service.savePhoneNumber(phoneNumber);
        return ResponseEntity.ok(savedPhoneNumber);
    }
    
    @GetMapping("api/phone-numbers/{username}")
    public ResponseEntity<String> getPhoneNumberByUsername(@PathVariable String username) {
        PhoneNumber phoneNumber = service.getPhoneNumberByUsername(username);
        if (phoneNumber != null) {
            return ResponseEntity.ok(phoneNumber.getPhoneNumber());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/api/check-username/{username}")
    public boolean checkUsernameExistsPhone(@PathVariable String username) {
        return service.isUsernamePresent(username);
    }
}