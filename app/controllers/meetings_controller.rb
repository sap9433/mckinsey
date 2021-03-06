class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy, :storeupload, :participate, :user_input]

  # GET /meetings
  # GET /meetings.json
  def index
    @meetings = Meeting.all
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
  end

  # GET /meetings/new
  def new
    @meeting = Meeting.new
  end

  # GET /meetings/1/edit
  def edit
  end

  # POST /meetings
  # POST /meetings.json
  def create
    @meeting = Meeting.new(meeting_params)

    respond_to do |format|
      if @meeting.save
        format.html { redirect_to @meeting, notice: 'Meeting was successfully created.' }
        format.json { render action: 'show', status: :created, location: @meeting }
      else
        format.html { render action: 'new' }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /meetings/1
  # PATCH/PUT /meetings/1.json
  def update
    respond_to do |format|
      if @meeting.update(meeting_params)
        format.html { redirect_to @meeting, notice: 'Meeting was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /meetings/1
  # DELETE /meetings/1.json
  def destroy
    @meeting.destroy
    respond_to do |format|
      format.html { redirect_to meetings_url }
      format.json { head :no_content }
    end
  end

  def participate
    respond_to do |format|
      format.html { render action: 'participants_template', :layout => false }
    end
  end

  def participant_details
    respond_to do |format|
      format.html { render action: 'participant_details', :layout => false }
    end
  end

  def user_input
    @uploadedBills = @meeting.userimages.all
    respond_to do |format|
      format.html { render action: 'user_input', :layout => false }
    end
  end

  def storeupload
     @meeting.userimages.create(url: params[:url], userdetails: params[:agent], additional: params[:filename])
     render :nothing => true
  end
  
  def choose_action
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      meeting_id = params[:id] || 1
      @meeting = Meeting.find(meeting_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meeting_params
      params.require(:meeting).permit(:uid, :name, :agenda, :desc, :timing)
    end
end
