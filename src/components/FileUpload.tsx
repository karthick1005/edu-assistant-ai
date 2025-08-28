import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  syllabus: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface FileUploadProps {
  selectedSyllabus: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ selectedSyllabus }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      syllabus: selectedSyllabus,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    for (const file of newFiles) {
      const uploadFile = async () => {
        try {
          // Simulate upload progress
          for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setUploadedFiles(prev => 
              prev.map(f => 
                f.id === file.id ? { ...f, progress } : f
              )
            );
          }

          // Simulate API call to backend
          // In real implementation: await uploadPDFToBackend(file, selectedSyllabus)
          
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, status: 'success' } : f
            )
          );

          toast({
            title: "File uploaded successfully",
            description: `${file.name} is ready for questions`,
          });
        } catch (error) {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, status: 'error' } : f
            )
          );

          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
        }
      };

      uploadFile();
    }
  }, [selectedSyllabus, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload only PDF files",
        variant: "destructive",
      });
    }
    
    if (pdfFiles.length > 0) {
      const fileList = new DataTransfer();
      pdfFiles.forEach(file => fileList.items.add(file));
      handleFileUpload(fileList.files);
    }
  }, [handleFileUpload, toast]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
      e.target.value = ''; // Reset input
    }
  }, [handleFileUpload]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="gradient-card shadow-medium">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Upload PDF Materials</h2>
          <Badge variant="outline" className="ml-auto">
            {selectedSyllabus.toUpperCase()}
          </Badge>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            isDragging ? 'text-primary' : 'text-muted-foreground'
          }`} />
          <h3 className="text-lg font-medium mb-2">
            Drop PDF files here or click to upload
          </h3>
          <p className="text-muted-foreground mb-4">
            Upload {selectedSyllabus} syllabus materials (PDF only)
          </p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleInputChange}
            className="hidden"
            id="file-upload"
          />
          <Button asChild className="gradient-primary shadow-medium">
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose Files
            </label>
          </Button>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    file.status === 'success' 
                      ? 'bg-success/20' 
                      : file.status === 'error'
                      ? 'bg-destructive/20'
                      : 'bg-primary/20'
                  }`}>
                    {file.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : file.status === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {file.syllabus}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="h-2" />
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      {file.status === 'success' && 'Ready for questions'}
                      {file.status === 'error' && 'Upload failed'}
                      {file.status === 'uploading' && `Uploading... ${file.progress}%`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FileUpload;